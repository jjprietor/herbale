"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

export default function Gracias() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-2xl px-6 md:px-10 pt-44 pb-32 text-center">
        <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-6">
          · Gracias
        </p>
        <h1 className="display text-ink text-[clamp(56px,9vw,128px)] leading-[0.9] italic">
          Está en camino.
        </h1>
        <p className="text-ink-soft text-[16px] leading-relaxed max-w-md mx-auto mt-10">
          Te enviamos la confirmación a tu correo. Si vives en Santiago, lo
          recibes en 24–48 h. Fuera de la capital, 3–5 días.
        </p>
        <div className="mt-12">
          <Link href="/formulas" className="btn-ghost">
            Volver a las fórmulas
          </Link>
        </div>
      </div>
    </section>
  );
}
