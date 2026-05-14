import Link from "next/link";
import { PACKS, INFUSOR, formatCLP } from "@/lib/products";
import { Reveal } from "./Reveal";

export function Prices() {
  return (
    <section id="precios" className="bg-cream-light border-y border-[var(--rule-soft)]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <h2 className="display text-ink text-[clamp(56px,9vw,128px)] leading-[0.9] text-center mb-20">
            Precios
          </h2>
        </Reveal>

        <Reveal>
          <p className="display text-ink text-[clamp(32px,4vw,48px)] mb-10">
            Fórmulas
          </p>
        </Reveal>

        <div className="space-y-9 mb-24">
          {Object.values(PACKS).map((p, i) => (
            <Reveal key={p.size} delay={i * 80}>
              <div className="flex items-baseline">
                <div>
                  <p className="display text-ink text-[26px] md:text-[34px] leading-tight">
                    {p.label}
                    {p.discount > 0 && (
                      <span className="text-ink-mute text-[20px] md:text-[26px]"> ({p.discount}% off)</span>
                    )}
                  </p>
                  <p className="text-olive italic text-[15px] mt-1">{p.sub}</p>
                </div>
                <span className="leader" />
                <span className="display text-ink text-[26px] md:text-[34px] tabular-nums shrink-0">
                  {formatCLP(p.price)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="display text-ink text-[clamp(32px,4vw,48px)] mb-10">
            Infusores
          </p>
        </Reveal>

        <Reveal>
          <div className="flex items-baseline">
            <div>
              <p className="display text-ink text-[26px] md:text-[34px] leading-tight">
                {INFUSOR.name}
              </p>
              <p className="text-olive italic text-[15px] mt-1">{INFUSOR.description}</p>
            </div>
            <span className="leader" />
            <span className="display text-ink text-[26px] md:text-[34px] tabular-nums shrink-0">
              {formatCLP(INFUSOR.price)}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 text-center">
            <Link href="/precios" className="btn-primary">
              Armar mi pack
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 flex justify-center">
          <span className="display text-olive text-[22px] italic">H</span>
        </div>
      </div>
    </section>
  );
}
