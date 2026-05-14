import { Leaf, Mountain, Droplets, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Leaf,
    title: "Orgánico certificado",
    body: "Cada lote es trazable a la cosecha. Sin pesticidas, sin saborizantes.",
  },
  {
    icon: Mountain,
    title: "Origen único",
    body: "Productores pequeños en valles de altura. Una sola finca por fórmula.",
  },
  {
    icon: Droplets,
    title: "Hierbas vivas",
    body: "Cosecha reciente. Envasado bajo nitrógeno para preservar el aceite esencial.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de hojas",
    body: "Si no te enamora, lo cambiamos sin preguntas. Durante 30 días.",
  },
];

export function ValuesStrip() {
  return (
    <section className="relative bg-background-deep border-y border-[var(--rule-soft)]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col gap-2">
            <Icon size={20} className="text-gold mb-1" />
            <h3 className="serif text-cream text-lg leading-tight">{title}</h3>
            <p className="text-foreground-muted text-[13px] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
