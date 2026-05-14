import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background-deep border-t border-[var(--rule-soft)] text-foreground-muted">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="serif text-cream text-3xl mb-3">
            Herbal<span className="text-gold">é</span>
          </p>
          <p className="max-w-sm text-sm leading-relaxed">
            Tés e infusiones orgánicas de origen único. Construimos fórmulas
            vivas, en cosechas pequeñas, con transparencia radical.
          </p>
        </div>
        <FooterCol
          title="Tienda"
          items={[
            { href: "/shop", label: "Todos los productos" },
            { href: "/shop?cat=té", label: "Tés" },
            { href: "/shop?cat=infusion", label: "Infusiones" },
            { href: "/shop?cat=pack", label: "Packs" },
            { href: "/shop?cat=accesorio", label: "Accesorios" },
          ]}
        />
        <FooterCol
          title="Casa"
          items={[
            { href: "/about", label: "Sobre nosotros" },
            { href: "/about#origen", label: "Origen" },
            { href: "/about#trazabilidad", label: "Trazabilidad" },
            { href: "mailto:hola@herbale.cl", label: "Contacto" },
          ]}
        />
        <FooterCol
          title="Servicio"
          items={[
            { href: "/shipping", label: "Envíos & devoluciones" },
            { href: "/terms", label: "Términos" },
            { href: "/privacy", label: "Privacidad" },
            { href: "/wholesale", label: "Mayoristas" },
          ]}
        />
      </div>
      <div className="border-t border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.14em] uppercase text-foreground-muted/70">
          <span>© {new Date().getFullYear()} Herbalé · Hecho con paciencia</span>
          <span>Santiago — Chile</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-cream text-[11px] tracking-[0.22em] uppercase mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="hover:text-gold transition-colors"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
