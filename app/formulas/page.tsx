import { FormulasGrid } from "@/components/FormulasGrid";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fórmulas",
  description: "Seis fórmulas hechas con plantas reales. Sin extractos, sin saborizantes.",
};

export default function Formulas() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 md:px-10 pt-44 pb-10 text-center">
          <Reveal>
            <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-6">
              · Catálogo
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-ink text-[clamp(64px,10vw,160px)] leading-[0.9]">
              Las seis fórmulas
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-ink-soft text-[16px] leading-relaxed max-w-md mx-auto mt-10 italic">
              Construidas para acompañar momentos distintos del día. Cada una con su nombre, su color, su planta principal.
            </p>
          </Reveal>
        </div>
      </section>
      <FormulasGrid showHeading={false} />
      <section className="bg-cream pb-32 text-center">
        <Link href="/precios" className="btn-primary">Armar mi pack</Link>
      </section>
    </>
  );
}
