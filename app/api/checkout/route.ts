import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { PACKS, INFUSOR, formulas, formatCLP } from "@/lib/products";

const SHIPPING_THRESHOLD = 25000;
const SHIPPING_COST = 3990;

type Body = {
  lines: (
    | {
        kind: "pack";
        uid: string;
        size: 1 | 3 | 6;
        formulaIds: string[];
        qty: number;
      }
    | { kind: "infusor"; uid: string; qty: number }
  )[];
};

export async function POST(req: Request) {
  const { lines } = (await req.json()) as Body;
  if (!lines || lines.length === 0) {
    return NextResponse.json({ error: "Canasta vacía" }, { status: 400 });
  }

  const items = lines.map((l, idx) => {
    if (l.kind === "infusor") {
      return {
        id: `infusor-${idx}`,
        title: INFUSOR.name,
        description: INFUSOR.description,
        quantity: l.qty,
        unit_price: INFUSOR.price,
        currency_id: "CLP",
      };
    }
    const pack = PACKS[l.size];
    const names =
      l.formulaIds
        .map((id) => formulas.find((f) => f.id === id)?.name)
        .filter(Boolean)
        .join(", ") || "Selección Herbalé";
    return {
      id: `pack-${l.size}-${idx}`,
      title: `${pack.label} de fórmulas — ${names}`,
      description: names,
      quantity: l.qty,
      unit_price: pack.price,
      currency_id: "CLP",
    };
  });

  const subtotal = items.reduce(
    (a, b) => a + b.unit_price * b.quantity,
    0,
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  if (shipping > 0) {
    items.push({
      id: "shipping",
      title: "Envío estándar",
      description: "24–48h en Santiago, 3–5 días resto de Chile",
      quantity: 1,
      unit_price: shipping,
      currency_id: "CLP",
    });
  }

  const origin =
    req.headers.get("origin") ??
    `https://${req.headers.get("host") ?? "herbale.cl"}`;

  const token = process.env.MP_ACCESS_TOKEN;
  if (token) {
    try {
      const client = new MercadoPagoConfig({ accessToken: token });
      const pref = await new Preference(client).create({
        body: {
          items,
          back_urls: {
            success: `${origin}/gracias`,
            failure: `${origin}/precios`,
            pending: `${origin}/gracias?status=pending`,
          },
          auto_return: "approved",
          binary_mode: false,
          statement_descriptor: "HERBALE",
          notification_url: `${origin}/api/webhook/mercadopago`,
        },
      });
      const url = pref.init_point ?? pref.sandbox_init_point;
      if (!url) {
        return NextResponse.json(
          { error: "Mercado Pago no devolvió URL" },
          { status: 500 },
        );
      }
      return NextResponse.json({ url });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "MP error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  // Fallback: WhatsApp (cuando aún no hay credenciales configuradas)
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "56912345678";
  const summary = items
    .filter((it) => it.id !== "shipping")
    .map(
      (it) =>
        `• ${it.quantity} × ${it.title} — ${formatCLP(it.unit_price * it.quantity)}`,
    );
  const total = subtotal + shipping;
  const msg = encodeURIComponent(
    [
      "Hola Herbalé, quiero comprar:",
      "",
      ...summary,
      "",
      `Subtotal: ${formatCLP(subtotal)}`,
      `Envío: ${shipping ? formatCLP(shipping) : "Gratis"}`,
      `Total: ${formatCLP(total)}`,
    ].join("\n"),
  );

  return NextResponse.json({
    fallbackWhatsApp: `https://wa.me/${phone}?text=${msg}`,
  });
}
