import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Quiénes somos y cómo trabajamos en Herbalé.",
};

export default function Sobre() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-44 pb-20 text-center">
          <Reveal>
            <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-6">
              · La casa
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-ink text-[clamp(56px,9vw,128px)] leading-[0.9] italic">
              Hierbas con propósito.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-light border-y border-[var(--rule-soft)]">
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-24 md:py-32 space-y-10 text-ink-soft text-[18px] md:text-[20px] leading-[1.65]">
          <Reveal><p>
            Herbalé nace en Santiago, en una cocina, leyendo etiquetas de infusiones que ya no decían nada. Saborizantes. Aromas idénticos. Plantas que viajaban más que nosotros.
          </p></Reveal>
          <Reveal delay={80}><p>
            Empezamos a buscar productores chilenos que cultivaran como antes: hierba real, cosecha pequeña, secado al aire. Y cuando los encontramos, decidimos no esconderlos atrás de una mezcla — los pusimos en la etiqueta.
          </p></Reveal>
          <Reveal delay={160}><p>
            Hoy somos seis fórmulas. Cada una con un propósito. Cada una con su lista de ingredientes a la vista, sin nada más.
          </p></Reveal>
          <Reveal delay={240}>
            <p className="display italic text-ink text-[clamp(28px,4vw,44px)] leading-tight pt-6">
              Lo que ves en el frasco — eso es lo que viene del campo. Nada más.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24 text-center">
        <Link href="/formulas" className="btn-primary">Conocer las fórmulas</Link>
      </section>
    </>
  );
}
