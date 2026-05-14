import Image from "next/image";
import Link from "next/link";
import { getHero, formatCLP } from "@/lib/products";

export function Hero() {
  const hero = getHero();
  return (
    <section className="relative overflow-hidden grain">
      {/* deep gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,#143126_0%,#0c2018_50%,#081710_100%)]" />
      {/* hero plinth shadow */}
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 items-end min-h-[70vh]">
          {/* copy */}
          <div className="relative z-10">
            <p className="fade-up text-gold text-[11px] tracking-[0.28em] uppercase mb-6">
              · Hierbas con propósito
            </p>
            <h1 className="fade-up delay-1 serif gold-text text-[clamp(56px,9vw,128px)] leading-[0.92] font-medium mb-8">
              Nuestras<br />
              <span className="italic">más vendidas</span>
            </h1>
            <p className="fade-up delay-2 max-w-md text-foreground-muted text-[15px] leading-relaxed mb-10">
              Cosechas pequeñas, origen único, certificación orgánica. Seis
              fórmulas vivas, construidas para acompañar cada momento del día —
              desde la primera luz hasta la noche larga.
            </p>
            <div className="fade-up delay-3 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="gold-fill">
                Comprar ahora
              </Link>
              <Link
                href={`/product/${hero.slug}`}
                className="gold-link"
              >
                Ver destacado
              </Link>
            </div>
          </div>

          {/* hero pedestal */}
          <div className="relative flex justify-center md:justify-end">
            <div className="fade-up delay-2 relative w-[78%] max-w-[460px] aspect-[3/4] pedestal overflow-hidden">
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                priority
                sizes="(max-width: 768px) 78vw, 460px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <p className="text-cream/85 text-[11px] tracking-[0.18em] uppercase mb-1">
                  Destacado
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="serif text-cream text-2xl">{hero.name}</h3>
                  <span className="text-gold text-sm tracking-wide tabular-nums">
                    {formatCLP(hero.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
