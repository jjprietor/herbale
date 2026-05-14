import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Cómo trabajamos: cosechas pequeñas, origen único, sin saborizantes.",
};

export default function About() {
  return (
    <>
      <section className="relative grain bg-[radial-gradient(120%_80%_at_50%_-10%,#143126_0%,#0c2018_60%,#081710_100%)]">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-40 pb-20 text-center">
          <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-5">
            · La casa
          </p>
          <h1 className="serif gold-text text-[clamp(48px,7vw,96px)] leading-[0.96] mb-7">
            Hierbas con <span className="italic">propósito</span>
          </h1>
          <p className="text-foreground-muted text-[16px] leading-relaxed">
            Herbalé existe porque las hierbas con las que crecimos ya no se
            consiguen. Industrializadas, mezcladas, perfumadas. Empezamos a
            buscar productores que cultivan como antes — un solo origen, una
            sola cosecha, sin atajos.
          </p>
        </div>
      </section>

      <section id="origen" className="bg-background-deep border-y border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[4/5] pedestal overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80"
              alt="Origen"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4">
              · Origen
            </p>
            <h2 className="serif text-cream text-3xl md:text-5xl leading-[1.05] mb-6">
              Seis familias. Tres países.
            </h2>
            <p className="text-foreground-muted text-[15px] leading-relaxed mb-4">
              Trabajamos directamente con seis familias productoras en Chile,
              Argentina y Japón. Visitamos cada finca al menos una vez al año.
              Pagamos por encima del precio orgánico de mercado porque el
              cuidado tiene un costo, y ese costo lo asumimos nosotros, no la
              tierra.
            </p>
            <p className="text-foreground-muted text-[15px] leading-relaxed">
              Esto no es una promesa de marketing. Es la única razón por la
              que existimos.
            </p>
          </div>
        </div>
      </section>

      <section id="trazabilidad" className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24">
          <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4 text-center">
            · Trazabilidad
          </p>
          <h2 className="serif text-cream text-3xl md:text-5xl text-center mb-12 leading-[1.05]">
            Cada bolsa tiene <span className="italic gold-text">su lote.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: "01", t: "Cosecha", b: "Día, finca y productor anotados en cada lote." },
              { n: "02", t: "Análisis", b: "Pruebas de pesticidas y metales pesados en laboratorio independiente." },
              { n: "03", t: "Envasado", b: "Bajo nitrógeno, en lotes pequeños, en Santiago." },
            ].map((s) => (
              <div key={s.n} className="pedestal p-7">
                <p className="serif gold-text text-4xl mb-3">{s.n}</p>
                <h3 className="serif text-cream text-xl mb-2">{s.t}</h3>
                <p className="text-foreground-muted text-[13px] leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/shop" className="gold-fill">
              Conocer la colección
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
