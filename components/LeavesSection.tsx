import Image from "next/image";
import Link from "next/link";
import { AppleReveal } from "./AppleReveal";


/**
 * Editorial section between hero and fórmulas: a circular pile of loose-leaf
 * tea drifting on a linen/wood backdrop, with marketing copy entering from
 * the left. Designed to feel premium and tactile.
 *
 * Drop the real image at /public/fotos/hojas-te.png — it gets optimized by
 * scripts/optimize-photos.mjs. Until then a CSS placeholder takes its place.
 */
export function LeavesSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: linen */}
      <div className="absolute inset-0 linen-bg -z-10" />
      {/* Soft vignette to anchor the leaves */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(70% 60% at 72% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40 grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-20 items-center">
        {/* LEFT — marketing copy, entering animated */}
        <div className="relative z-10">
          <AppleReveal delay={0}>
            <p className="sans text-[11px] tracking-[0.32em] uppercase text-olive-deep mb-6">
              · Cosecha 2026 — Lote 04
            </p>
          </AppleReveal>
          <AppleReveal delay={140}>
            <h2 className="display text-ink text-[clamp(48px,7.5vw,108px)] leading-[0.9] mb-8">
              Hoja por hoja.
              <br />
              <span className="italic">Planta</span> por planta.
            </h2>
          </AppleReveal>
          <AppleReveal delay={260}>
            <p className="text-ink-soft text-[17px] md:text-[19px] leading-[1.55] max-w-lg mb-6">
              Trabajamos solo con hojas enteras. Sin polvo, sin extractos, sin
              saborizantes — solo lo que el campo entregó esa semana, secado al
              aire y envasado en lotes pequeños.
            </p>
          </AppleReveal>
          <AppleReveal delay={380}>
            <p className="display italic text-olive-deep text-[19px] md:text-[22px] leading-snug max-w-md mb-10">
              Lo que entra a la bolsa es lo que sale del campo. Nada más, nada
              menos.
            </p>
          </AppleReveal>
          <AppleReveal delay={500}>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/formulas" className="btn-primary">
                Conocer la cosecha
              </Link>
              <Link href="/sobre" className="btn-ghost">
                Cómo trabajamos
              </Link>
            </div>
          </AppleReveal>
        </div>

        {/* RIGHT — circular pile of leaves on the linen */}
        <div className="relative h-[440px] md:h-[640px] flex items-center justify-center">
          {/* Shadow under the pile */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full blur-3xl"
            style={{ background: "rgba(40, 22, 8, 0.45)" }}
          />

          {/* The leaves image with subtle breathing scale */}
          <AppleReveal delay={120} className="relative w-[78%] aspect-square">
            <div className="absolute inset-0 leaves-breath">
              <Image
                src="/fotos/opt/Te-suelto-480.webp"
                alt="Hojas de té sueltas"
                fill
                sizes="(max-width: 768px) 80vw, 500px"
                className="object-contain drop-shadow-[0_30px_40px_rgba(40,22,8,0.35)]"
                priority
              />
            </div>
          </AppleReveal>
        </div>
      </div>
    </section>
  );
}

