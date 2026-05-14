import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  PACKS,
  INFUSOR,
  formulas,
  formatCLP,
} from "@/lib/products";

const SHIPPING_THRESHOLD = 25000;
const SHIPPING_COST = 3990;

type Body = {
  lines: (
    | { kind: "pack"; uid: string; size: 1 | 3 | 6; formulaIds: string[]; qty: number }
    | { kind: "infusor"; uid: string; qty: number }
  )[];
};

export async function POST(req: Request) {
  const { lines } = (await req.json()) as Body;
  if (!lines || lines.length === 0) {
    return NextResponse.json({ error: "Canasta vacía" }, { status: 400 });
  }

  const items = lines.map((l) => {
    if (l.kind === "infusor") {
      return {
        name: INFUSOR.name,
        description: INFUSOR.description,
        amount: INFUSOR.price,
        qty: l.qty,
      };
    }
    const pack = PACKS[l.size];
    const names = l.formulaIds
      .map((id) => formulas.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    return {
      name: `${pack.label} de fórmulas`,
      description: names || "Selección Herbalé",
      amount: pack.price,
      qty: l.qty,
    };
  });

  const subtotal = items.reduce((a, b) => a + b.amount * b.qty, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    try {
      const stripe = new Stripe(stripeKey);
      const origin =
        req.headers.get("origin") ??
        `https://${req.headers.get("host") ?? "herbale.cl"}`;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: items.map((it) => ({
          quantity: it.qty,
          price_data: {
            currency: "clp",
            unit_amount: it.amount,
            product_data: {
              name: it.name,
              description: it.description,
            },
          },
        })),
        shipping_options: shipping
          ? [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  display_name: "Envío estándar",
                  fixed_amount: { amount: shipping, currency: "clp" },
                },
              },
            ]
          : undefined,
        success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/precios`,
      });
      return NextResponse.json({ url: session.url });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Stripe error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  // WhatsApp fallback
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "56912345678";
  const summary = items.map(
    (it) =>
      `• ${it.qty} × ${it.name}${it.description ? ` (${it.description})` : ""} — ${formatCLP(it.amount * it.qty)}`,
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
