import Image from "next/image";
import Link from "next/link";
import { type Product, formatCLP } from "@/lib/products";
import { cn } from "@/lib/cn";

type Props = {
  product: Product;
  height?: "tall" | "short";
  className?: string;
  priority?: boolean;
};

export function ProductCard({ product, height = "tall", className, priority }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "pedestal group block overflow-hidden",
        height === "tall" ? "aspect-[3/4.4]" : "aspect-[3/3.8]",
        className,
      )}
    >
      <div className="relative h-[72%] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
      </div>
      <div className="px-5 pt-4 pb-5 flex flex-col gap-1.5">
        <p className="text-[10px] tracking-[0.18em] uppercase text-foreground-muted">
          {product.category === "té"
            ? "Té"
            : product.category === "infusion"
              ? "Infusión"
              : product.category === "pack"
                ? "Pack"
                : "Accesorio"}
        </p>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="serif text-cream text-[19px] leading-tight">{product.name}</h3>
          <span className="text-gold text-[13px] tabular-nums shrink-0">
            {formatCLP(product.price)}
          </span>
        </div>
        <p className="text-foreground-muted/85 text-[12px] line-clamp-1">
          {product.tagline}
        </p>
      </div>
    </Link>
  );
}
