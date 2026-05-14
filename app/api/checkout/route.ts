import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products, formatCLP } from "@/lib/products";

const SHIPPING_THRESHOLD = 25000;
const SHIPPING_COST = 3990;

type Body = {
  items: { id: string; qty: number }[];
};

export async function POST(req: Request) {
  const { items } = (await req.json()) as Body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  const lineItems = items
    .map((i) => {
      const p = products.find((p) => p.id === i.id);
      if (!p) return null;
      return { product: p, qty: i.qty };
    })
    .filter((x): x is { product: (typeof products)[number]; qty: number } => x !== null);

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Productos inválidos" }, { status: 400 });
  }

  const subtotal = lineItems.reduce(
    (a, b) => a + b.product.price * b.qty,
    0,
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  // Stripe path (preferred)
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    try {
      const stripe = new Stripe(stripeKey);
      const origin =
        req.headers.get("origin") ??
        `https://${req.headers.get("host") ?? "herbale.vercel.app"}`;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems.map(({ product, qty }) => ({
          quantity: qty,
          price_data: {
            currency: "clp",
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.tagline,
              images: [product.image],
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
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/shop`,
      });
      return NextResponse.json({ url: session.url });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Stripe error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  // Fallback: build a WhatsApp checkout deep link
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "56912345678";
  const lines = lineItems.map(
    ({ product, qty }) =>
      `• ${qty} × ${product.name} — ${formatCLP(product.price * qty)}`,
  );
  const total = subtotal + shipping;
  const msg = encodeURIComponent(
    [
      "Hola Herbalé, quiero comprar:",
      "",
      ...lines,
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
