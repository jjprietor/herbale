import Link from "next/link";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago confirmado",
};

export default function Success() {
  return (
    <section className="relative grain bg-[radial-gradient(120%_80%_at_50%_-10%,#143126_0%,#0c2018_60%,#081710_100%)]">
      <div className="mx-auto max-w-2xl px-6 md:px-10 pt-40 pb-32 text-center">
        <ClearCartOnMount />
        <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-5">
          · Gracias
        </p>
        <h1 className="serif gold-text text-[clamp(48px,7vw,88px)] leading-[0.98] mb-6">
          Tu pedido <span className="italic">está en camino.</span>
        </h1>
        <p className="text-foreground-muted text-[15px] leading-relaxed mb-10">
          Te enviamos la confirmación a tu correo. Si vives en Santiago, lo
          recibes en 24–48h. Fuera de la capital, 3–5 días.
        </p>
        <Link href="/shop" className="gold-link">
          Volver a la tienda
        </Link>
      </div>
    </section>
  );
}
