import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-[var(--rule-soft)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 flex flex-col items-center gap-6 text-center">
        <p className="display text-ink text-[clamp(48px,8vw,96px)] leading-[0.95]">
          Herbalé
        </p>
        <p className="sans text-[11px] tracking-[0.24em] uppercase text-ink-mute">
          Hierbas con propósito
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sans text-[12px] tracking-[0.18em] uppercase text-ink/85">
          <Link href="/formulas" className="hover:text-olive">Fórmulas</Link>
          <Link href="/precios" className="hover:text-olive">Precios</Link>
          <Link href="/sobre" className="hover:text-olive">Sobre</Link>
          <a href="mailto:contacto@herbale.cl" className="hover:text-olive">Contacto</a>
          <a href="https://www.instagram.com/herbale.cl/" target="_blank" rel="noopener" className="hover:text-olive">Instagram</a>
        </nav>
        <p className="sans text-[10px] tracking-[0.2em] uppercase text-ink-mute mt-8">
          © {new Date().getFullYear()} · Hecho con paciencia en Santiago
        </p>
      </div>
    </footer>
  );
}
