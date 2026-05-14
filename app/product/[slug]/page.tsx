import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";
import { getProduct, products, formatCLP } from "@/lib/products";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: {
      title: `${p.name} · Herbalé`,
      description: p.description,
      images: [p.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = products
    .filter((x) => x.id !== p.id && x.category === p.category)
    .slice(0, 4);

  return (
    <section className="relative grain bg-[radial-gradient(120%_80%_at_50%_-10%,#143126_0%,#0c2018_60%,#081710_100%)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-36 pb-24">
        <nav className="text-[11px] tracking-[0.18em] uppercase text-foreground-muted/80 mb-10 flex gap-2">
          <Link href="/" className="hover:text-gold">Casa</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold">Tienda</Link>
          <span>/</span>
          <span className="text-cream">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="relative aspect-[4/5] pedestal overflow-hidden">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4">
              · {p.category === "té" ? "Té" : p.category === "infusion" ? "Infusión" : p.category === "pack" ? "Pack" : "Accesorio"}
            </p>
            <h1 className="serif gold-text text-[clamp(40px,6vw,76px)] leading-[0.98] mb-4">
              {p.name}
            </h1>
            <p className="text-foreground-muted text-[15px] mb-8">{p.tagline}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="serif gold-text text-4xl tabular-nums">
                {formatCLP(p.price)}
              </span>
              <span className="text-foreground-muted text-[12px]">/ bolsa 80g</span>
            </div>

            <p className="text-cream/90 text-[15px] leading-relaxed mb-8 max-w-prose">
              {p.description}
            </p>

            {p.notes.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.22em] uppercase text-foreground-muted mb-3">
                  Notas
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.notes.map((n) => (
                    <span
                      key={n}
                      className="text-[12px] text-cream/85 border border-[var(--rule)] rounded-full px-3 py-1"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <AddToCart id={p.id} />

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--rule-soft)] pt-8 text-[13px]">
              <Spec label="Cafeína" value={p.caffeine} />
              <Spec label="Temperatura" value={p.brewing.temp} />
              <Spec label="Infusión" value={p.brewing.time} />
              <Spec label="Stock" value={`${p.stock} en bodega`} />
              <Spec
                label="Ingredientes"
                value={p.ingredients.join(", ")}
                full
              />
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <div className="flex items-end justify-between mb-10">
              <h2 className="serif text-cream text-3xl md:text-4xl">
                También en la casa
              </h2>
              <Link href="/shop" className="text-gold text-[12px] tracking-[0.14em] uppercase border-b border-gold/40 pb-0.5 hover:text-cream">
                Ver todo →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} height="short" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Spec({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <dt className="text-[10px] tracking-[0.22em] uppercase text-foreground-muted mb-1.5">
        {label}
      </dt>
      <dd className="text-cream capitalize">{value}</dd>
    </div>
  );
}
