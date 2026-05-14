import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { getFeatured } from "@/lib/products";

export function FeaturedGrid() {
  // Skip the hero product since it's already shown above.
  const items = getFeatured().filter((p) => !p.hero);

  // Reference uses a staggered pedestal grid: 3 tall + 3 short, slight offsets.
  const tall = items.slice(0, 3);
  const short = items.slice(3, 6);

  return (
    <section
      id="featured"
      className="relative grain bg-[linear-gradient(180deg,#081710_0%,#0c2018_50%,#143126_100%)]"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-8 pb-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold text-[11px] tracking-[0.28em] uppercase mb-3">
              · Fórmulas en cosecha
            </p>
            <h2 className="serif text-cream text-[clamp(32px,5vw,56px)] leading-[1.02] max-w-2xl">
              Una colección breve.
              <br />
              <span className="italic text-foreground-muted">
                Trazable hasta la planta.
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-gold text-[12px] tracking-[0.14em] uppercase border-b border-gold/40 pb-1 hover:text-cream hover:border-cream transition-colors"
          >
            Ver toda la tienda →
          </Link>
        </div>

        {/* Staggered pedestal layout (reference image) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-7 gap-y-12 md:gap-y-14">
          {tall.map((p, i) => (
            <div
              key={p.id}
              className="fade-up"
              style={{
                animationDelay: `${i * 80}ms`,
                transform: i === 1 ? "translateY(-24px)" : i === 2 ? "translateY(12px)" : "none",
              }}
            >
              <ProductCard product={p} height="tall" />
            </div>
          ))}
          {short.map((p, i) => (
            <div
              key={p.id}
              className="fade-up"
              style={{
                animationDelay: `${(i + 3) * 80}ms`,
                transform: i === 1 ? "translateY(-18px)" : "none",
              }}
            >
              <ProductCard product={p} height="short" />
            </div>
          ))}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <Link href="/shop" className="gold-link">
            Ver toda la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}
