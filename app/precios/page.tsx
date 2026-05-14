import { Prices } from "@/components/Prices";
import { PackBuilder } from "@/components/PackBuilder";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precios & packs",
  description: "Pack 1, Pack 3 (15% off), Pack 6 (25% off). Arma el tuyo.",
};

export default function Precios() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-44 pb-12 text-center">
          <Reveal>
            <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-6">
              · 02 — Precios
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-ink text-[clamp(80px,12vw,180px)] leading-[0.88]">
              Arma tu pack.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-ink-soft text-[16px] leading-relaxed max-w-md mx-auto mt-8 italic">
              Mientras más fórmulas eliges, menos pagas por cada una.
            </p>
          </Reveal>
        </div>
      </section>
      <PackBuilder />
      <Prices />
    </>
  );
}
