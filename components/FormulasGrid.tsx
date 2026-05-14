"use client";

import Link from "next/link";
import { Bottle } from "./Bottle";
import { Reveal } from "./Reveal";
import { formulas } from "@/lib/products";

export function FormulasGrid({
  showHeading = true,
  className = "",
}: {
  showHeading?: boolean;
  className?: string;
}) {
  return (
    <section className={`relative bg-cream ${className}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        {showHeading && (
          <Reveal>
            <p className="sans text-[11px] tracking-[0.28em] uppercase text-olive mb-5 text-center">
              · Las seis
            </p>
            <h2 className="display text-ink text-[clamp(48px,8vw,120px)] leading-[0.92] text-center mb-16">
              Fórmulas
            </h2>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-y-24">
          {formulas.map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 90}>
              <Link
                href={`/formulas/${f.slug}`}
                className={`cat-divider px-2 md:px-8 group block text-center md:text-left`}
              >
                <div className="bottle-wrap mx-auto md:mx-0 w-[180px] md:w-[200px] float-soft" style={{ animationDelay: `${i * 200}ms` }}>
                  <Bottle formula={f} size={200} />
                </div>
                <div className="mt-6">
                  <h3
                    className="display text-[44px] md:text-[52px] leading-[1] mb-3"
                    style={{ color: f.color }}
                  >
                    {f.name}
                  </h3>
                  <p className="text-ink-soft text-[16px] leading-snug max-w-[24ch] mx-auto md:mx-0 mb-4">
                    {f.benefit}
                  </p>
                  <p className="text-ink-mute italic text-[13px] leading-relaxed max-w-[28ch] mx-auto md:mx-0">
                    {f.ingredients.join(", ")}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
