"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart, useCartCount } from "@/lib/cart-store";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCartCount();
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-cream/85 backdrop-blur-md border-b border-[var(--rule-soft)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 grid grid-cols-3 items-center">
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="sans text-[11px] tracking-[0.22em] uppercase text-ink justify-self-start inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <Menu size={16} />
            <span className="hidden md:inline">Menú</span>
          </button>

          <Link
            href="/"
            className="display text-[22px] md:text-[26px] tracking-tight text-ink justify-self-center"
            aria-label="Herbalé"
          >
            Herbalé
          </Link>

          <button
            onClick={openCart}
            aria-label={`Canasta (${count})`}
            className="sans text-[11px] tracking-[0.22em] uppercase text-ink justify-self-end inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ShoppingBag size={16} />
            <span className="tabular-nums">{count.toString().padStart(2, "0")}</span>
          </button>
        </div>
      </header>

      {/* Full-screen menu (extreme minimal) */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-cream transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 md:px-10 py-5 grid grid-cols-3 items-center">
            <span />
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="display text-[26px] tracking-tight text-ink justify-self-center"
            >
              Herbalé
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="sans text-[11px] tracking-[0.22em] uppercase text-ink justify-self-end inline-flex items-center gap-2"
            >
              <X size={16} />
              <span className="hidden md:inline">Cerrar</span>
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-7 -mt-12">
            {[
              { href: "/", label: "Casa" },
              { href: "/formulas", label: "Fórmulas" },
              { href: "/precios", label: "Precios" },
              { href: "/sobre", label: "Sobre nosotros" },
            ].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`display text-ink text-[clamp(40px,7vw,84px)] leading-[1] hover:text-olive transition-colors rise`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 md:px-10 py-6 flex items-center justify-between sans text-[11px] tracking-[0.18em] uppercase text-ink-mute">
            <span>Santiago — Chile</span>
            <a href="mailto:hola@herbale.cl" className="hover:text-ink">hola@herbale.cl</a>
          </div>
        </div>
      </div>
    </>
  );
}
