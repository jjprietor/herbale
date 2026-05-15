export type Formula = {
  id:
    | "digest"
    | "zeta"
    | "kalma"
    | "focus"
    | "cyclo"
    | "inmuna";
  slug: string;
  name: string;
  benefit: string;
  longBenefit: string;
  ingredients: string[];
  /** Label background color */
  color: string;
  /** Text on label */
  labelText: string;
  /** Decorative motif: spring | zigzag | leaf | star | heart | branch */
  motif: "spring" | "zigzag" | "leaf" | "star" | "heart" | "branch";
  /** Photo base name in /public/fotos/opt (resolves to -240.webp/-480.webp/-800.webp). Falls back to SVG when missing. */
  photo?: string;
};

export const formulas: Formula[] = [
  {
    id: "digest",
    slug: "digest",
    name: "Digest",
    benefit: "Alivia, apoya y refresca la digestión.",
    longBenefit:
      "Una fórmula construida para los días en que el cuerpo necesita reordenarse. Menta refrescante, hinojo dulce y un toque cálido de jengibre.",
    ingredients: ["Menta", "Hinojo", "Melisa", "Jengibre"],
    color: "#7A7548",
    labelText: "#ebdfc4",
    motif: "spring",
    photo: "digest_sin_fondo",
  },
  {
    id: "zeta",
    slug: "zeta",
    name: "Zeta",
    benefit: "Ayuda a tu relajación y dormir profundo.",
    longBenefit:
      "El descanso construido con paciencia. Lavanda francesa, valeriana y manzanilla. Para la noche que no te entrega el día.",
    ingredients: ["Lavanda", "Valeriana", "Manzanilla", "Melisa", "Menta"],
    color: "#B3AED4",
    labelText: "#3D2A1F",
    motif: "zigzag",
    photo: "zeta",
  },
  {
    id: "kalma",
    slug: "kalma",
    name: "Kalma",
    benefit: "Aliviana tensiones y calma el estrés.",
    longBenefit:
      "Hibisco vibrante, pasiflora y caléndula. Una fórmula floral y luminosa para sostener los días difíciles.",
    ingredients: ["Hibisco", "Pasiflora", "Melisa", "Manzanilla", "Caléndula"],
    color: "#D6A8C2",
    labelText: "#3D2A1F",
    motif: "leaf",
    photo: "kalma",
  },
  {
    id: "focus",
    slug: "focus",
    name: "Focus",
    benefit: "Estimula, concentra y energía.",
    longBenefit:
      "Té verde japonés, menta fresca y limón. Para empezar — o retomar — con la cabeza despejada.",
    ingredients: ["Té verde", "Menta", "Limón"],
    color: "#C8A24A",
    labelText: "#3D2A1F",
    motif: "star",
    photo: "focus",
  },
  {
    id: "cyclo",
    slug: "cyclo",
    name: "Cyclo",
    benefit: "Apoya tu ciclo menstrual.",
    longBenefit:
      "Frambueso, jengibre y caléndula. Una fórmula construida para acompañar el ciclo, con plantas que la tradición conoce hace siglos.",
    ingredients: ["Frambueso", "Jengibre", "Ortiga", "Manzanilla", "Caléndula"],
    color: "#6E2C36",
    labelText: "#ebdfc4",
    motif: "heart",
    photo: "cyclo",
  },
  {
    id: "inmuna",
    slug: "inmuna",
    name: "Inmuna",
    benefit: "Refuerza tus defensas.",
    longBenefit:
      "Cúrcuma, jengibre y caléndula con un fondo cítrico de naranja. Para los cambios de estación y los días que piden cuidado extra.",
    ingredients: [
      "Naranja",
      "Cúrcuma",
      "Jengibre",
      "Caléndula",
      "Menta",
      "Ortiga",
    ],
    color: "#C96B3A",
    labelText: "#ebdfc4",
    motif: "branch",
    photo: "inmuna",
  },
];

export function getFormula(slug: string) {
  return formulas.find((f) => f.slug === slug);
}

/** PRICING */
export const PACKS = {
  1: { size: 1, price: 8000, discount: 0, label: "Pack 1", sub: "Elige tu favorita" },
  3: { size: 3, price: 20400, discount: 15, label: "Pack 3", sub: "Elige tus 3 favoritas" },
  6: { size: 6, price: 36000, discount: 25, label: "Pack 6", sub: "Lleva una de cada una" },
} as const;

export type PackSize = keyof typeof PACKS;

export const INFUSOR = {
  id: "infusor",
  name: "Infusor de clip",
  description: "Acero inoxidable. Ideal para tus fórmulas.",
  price: 2800,
};

export function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
