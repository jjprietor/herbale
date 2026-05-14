import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Tés e infusiones orgánicas de origen único, cosechados en pequeños lotes.",
};

const categories = [
  { key: "all", label: "Todo" },
  { key: "té", label: "Tés" },
  { key: "infusion", label: "Infusiones" },
  { key: "pack", label: "Packs" },
  { key: "accesorio", label: "Accesorios" },
] as const;

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = cat ?? "all";
  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section className="relative grain bg-[radial-gradient(120%_80%_at_50%_-10%,#143126_0%,#0c2018_60%,#081710_100%)] min-h-screen">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-40 pb-24">
        <div className="mb-14">
          <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-4">
            · Catálogo
          </p>
          <h1 className="serif gold-text text-[clamp(48px,7vw,96px)] leading-[0.95] max-w-3xl">
            La casa <span className="italic">completa</span>
          </h1>
          <p className="text-foreground-muted text-[15px] leading-relaxed max-w-xl mt-6">
            Seis fórmulas en cosecha, packs degustación, y los infusores que
            recomendamos para que las hojas se desplieguen sin restricciones.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => {
            const isActive = active === c.key;
            const href = c.key === "all" ? "/shop" : `/shop?cat=${c.key}`;
            return (
              <Link
                key={c.key}
                href={href}
                className={`text-[12px] tracking-[0.14em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  isActive
                    ? "bg-gold text-background-deep border-gold"
                    : "border-[var(--rule)] text-cream/85 hover:text-gold hover:border-gold/50"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>

        {filtered.length === 0 ? (
          <p className="text-foreground-muted">Sin resultados en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-y-14">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} height="tall" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
