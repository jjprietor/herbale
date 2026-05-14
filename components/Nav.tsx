"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart, useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/cn";

const links = [
  { href: "/shop", label: "Tienda" },
  { href: "/shop?cat=té", label: "Tés" },
  { href: "/shop?cat=infusion", label: "Infusiones" },
  { href: "/about", label: "Sobre nosotros" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCartCount();
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-background-deep/85 backdrop-blur-md border-b border-[var(--rule-soft)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center gap-2">
          <button
            aria-label="Abrir menú"
            className="md:hidden text-cream"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className="hidden md:flex gap-9 text-[13px] tracking-wide text-cream/85">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link
          href="/"
          className="serif text-[22px] md:text-[26px] tracking-tight text-cream text-center"
        >
          Herbal<span className="text-gold">é</span>
        </Link>
        <div className="flex justify-end items-center gap-5 text-cream">
          <Link
            href="/shop"
            className="hidden md:inline text-[12px] tracking-[0.14em] uppercase text-cream/80 hover:text-gold transition-colors"
          >
            Comprar
          </Link>
          <button
            onClick={openCart}
            aria-label={`Carrito (${count})`}
            className="relative flex items-center gap-2 group"
          >
            <ShoppingBag size={18} className="group-hover:text-gold transition-colors" />
            <span className="text-[12px] tracking-wider tabular-nums">
              {count.toString().padStart(2, "0")}
            </span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--rule-soft)] bg-background-deep/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-5 gap-4 text-cream/90">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
