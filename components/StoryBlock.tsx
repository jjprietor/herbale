import Image from "next/image";
import Link from "next/link";

export function StoryBlock() {
  return (
    <section className="relative grain bg-[linear-gradient(180deg,#143126_0%,#0c2018_100%)] overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative aspect-[4/5] pedestal overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80"
            alt="Cosecha"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-5">
            · Nuestra forma de trabajar
          </p>
          <h2 className="serif gold-text text-[clamp(34px,5vw,64px)] leading-[1.02] mb-7">
            Una hierba <span className="italic">no es</span> una receta.
          </h2>
          <p className="text-foreground-muted text-[15px] leading-relaxed max-w-lg mb-5">
            Trabajamos con seis familias productoras, en tres países. No
            mezclamos cosechas. No agregamos saborizantes. Cada fórmula nace
            del año específico en que la planta fue recogida — y por eso cada
            cosecha sabe distinto.
          </p>
          <p className="text-foreground-muted text-[15px] leading-relaxed max-w-lg mb-9">
            Lo que ves en la bolsa es lo que viene del campo. Nada más.
          </p>
          <Link href="/about" className="gold-link">
            Conoce la casa
          </Link>
        </div>
      </div>
    </section>
  );
}
