import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

/**
 * Mercado Pago IPN webhook.
 * MP llama esta URL cada vez que cambia el estado de un pago.
 * Cuando agreguemos DB, aquí marcamos la orden como `paid` y disparamos email.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const topic = url.searchParams.get("topic") ?? url.searchParams.get("type");
  const id = url.searchParams.get("id") ?? url.searchParams.get("data.id");

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ ok: true, skipped: "no token" });

  if (topic === "payment" && id) {
    try {
      const client = new MercadoPagoConfig({ accessToken: token });
      const payment = await new Payment(client).get({ id });
      // TODO: when orders DB exists, upsert by payment.external_reference
      console.log("[MP webhook] payment", {
        id: payment.id,
        status: payment.status,
        amount: payment.transaction_amount,
        email: payment.payer?.email,
      });
    } catch (err) {
      console.error("[MP webhook] error", err);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
