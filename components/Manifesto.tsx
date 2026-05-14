import { Reveal } from "./Reveal";

export function Manifesto() {
  return (
    <section className="bg-ink text-cream-light">
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-32 md:py-48 text-center">
        <Reveal>
          <p className="sans text-[11px] tracking-[0.32em] uppercase text-cream-light/70 mb-8">
            · Manifiesto
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="display italic text-[clamp(28px,4.5vw,56px)] leading-[1.18] text-cream-light">
            Una hierba no es <span className="not-italic">solo</span> una hierba.
            Es un campo, una persona, una semana de sol y una noche de helada.
            <br />
            Lo que ves en el frasco — eso es lo que viene del campo.
            <br />
            Nada más.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="sans text-[11px] tracking-[0.28em] uppercase text-cream-light/60 mt-14">
            — Herbalé · Hierbas con propósito
          </p>
        </Reveal>
      </div>
    </section>
  );
}
