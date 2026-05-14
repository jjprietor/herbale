import { notFound } from "next/navigation";
import Link from "next/link";
import { Bottle } from "@/components/Bottle";
import { Reveal } from "@/components/Reveal";
import { formulas, getFormula } from "@/lib/products";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return formulas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFormula(slug);
  if (!f) return {};
  return {
    title: f.name,
    description: f.benefit,
  };
}

export default async function FormulaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFormula(slug);
  if (!f) notFound();

  const others = formulas.filter((x) => x.id !== f.id).slice(0, 3);

  return (
    <>
      <section className="bg-cream relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-32 mx-auto h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: f.color }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-40 pb-24 md:pt-48 md:pb-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className="flex justify-center md:justify-start">
              <div className="float-soft">
                <Bottle formula={f} size={340} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <Link href="/formulas" className="sans text-[11px] tracking-[0.22em] uppercase text-ink-mute hover:text-olive">
                ← Todas las fórmulas
              </Link>
              <h1
                className="display text-[clamp(80px,12vw,180px)] leading-[0.86] mt-4 mb-4"
                style={{ color: f.color }}
              >
                {f.name}
              </h1>
              <p className="display text-ink text-[clamp(22px,2.5vw,30px)] leading-snug italic mb-10 max-w-md">
                {f.benefit}
              </p>
              <p className="text-ink-soft text-[16px] leading-relaxed max-w-md mb-12">
                {f.longBenefit}
              </p>

              <div className="border-t border-[var(--rule-soft)] pt-8 mb-12">
                <p className="sans text-[10px] tracking-[0.24em] uppercase text-ink-mute mb-4">
                  Ingredientes
                </p>
                <div className="flex flex-wrap gap-2">
                  {f.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-[14px] italic px-4 py-1.5 rounded-full border border-[var(--rule)] text-ink"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/precios" className="btn-primary">
                Añadir a un pack
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-light py-24 border-t border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <p className="sans text-[11px] tracking-[0.24em] uppercase text-olive mb-3">
            · También en la casa
          </p>
          <h2 className="display text-ink text-[clamp(36px,5vw,64px)] leading-tight mb-12">
            Otras fórmulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-0">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/formulas/${o.slug}`}
                className="cat-divider px-2 md:px-8 text-center md:text-left group"
              >
                <div className="bottle-wrap mx-auto md:mx-0 w-[170px]">
                  <Bottle formula={o} size={170} detailed={false} />
                </div>
                <h3 className="display text-[36px] mt-5 leading-none" style={{ color: o.color }}>
                  {o.name}
                </h3>
                <p className="text-ink-soft text-[15px] mt-2 italic max-w-[24ch] mx-auto md:mx-0">
                  {o.benefit}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
