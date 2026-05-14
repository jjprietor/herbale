export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in CLP
  image: string;
  category: "infusion" | "té" | "pack" | "accesorio";
  notes: string[];
  ingredients: string[];
  brewing: { temp: string; time: string };
  caffeine: "ninguna" | "baja" | "media" | "alta";
  featured?: boolean;
  hero?: boolean;
  stock: number;
};

// Image sources: Unsplash (free to use, hot-linkable).
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "aurora",
    slug: "aurora",
    name: "Aurora",
    tagline: "Manzanilla orgánica · cosecha de altura",
    description:
      "Manzanilla cultivada a 1.800 m en los Andes. Floral, redonda, con un dulzor lácteo natural. Una infusión para descender, para volver al cuerpo.",
    price: 8900,
    image: img("1597481499750-3e6b22637e12"),
    category: "infusion",
    notes: ["Floral", "Miel", "Manzana verde"],
    ingredients: ["Manzanilla orgánica certificada"],
    brewing: { temp: "95°C", time: "5–7 min" },
    caffeine: "ninguna",
    featured: true,
    hero: true,
    stock: 42,
  },
  {
    id: "verde-altura",
    slug: "verde-altura",
    name: "Verde Altura",
    tagline: "Sencha primera cosecha",
    description:
      "Sencha de primera cosecha (ichibancha). Umami marino, vegetal fresco, final dulce. Procesado al vapor para preservar la clorofila viva.",
    price: 14500,
    image: img("1556679343-c7306c1976bc"),
    category: "té",
    notes: ["Umami", "Hierba recién cortada", "Algas suaves"],
    ingredients: ["Té verde sencha (Camellia sinensis) primera cosecha"],
    brewing: { temp: "75°C", time: "1.5 min" },
    caffeine: "media",
    featured: true,
    stock: 28,
  },
  {
    id: "ofelia",
    slug: "ofelia",
    name: "Ofelia",
    tagline: "Lavanda, hinojo & rosa",
    description:
      "Lavanda de Provenza, hinojo silvestre y pétalos de rosa damascena. Un descanso construido para la noche larga.",
    price: 10900,
    image: img("1564890369478-c89ca6d9cde9"),
    category: "infusion",
    notes: ["Lavanda", "Anís dulce", "Rosa"],
    ingredients: ["Lavanda orgánica", "Hinojo silvestre", "Pétalos de rosa damascena"],
    brewing: { temp: "95°C", time: "6 min" },
    caffeine: "ninguna",
    featured: true,
    stock: 31,
  },
  {
    id: "matcha-uji",
    slug: "matcha-uji",
    name: "Matcha Uji",
    tagline: "Grado ceremonial · Kyoto",
    description:
      "Matcha de grado ceremonial molido en piedra en Uji, Kyoto. Verde vibrante, espuma cremosa, dulzor persistente.",
    price: 24900,
    image: img("1536013455804-c34e4f4d8ba6"),
    category: "té",
    notes: ["Dulce", "Cremoso", "Vegetal profundo"],
    ingredients: ["Tencha sombreado · grado ceremonial"],
    brewing: { temp: "70°C", time: "Batir 20 s" },
    caffeine: "alta",
    featured: true,
    stock: 18,
  },
  {
    id: "rooibos-cedron",
    slug: "rooibos-cedron",
    name: "Rooibos Cedrón",
    tagline: "Rooibos rojo & cedrón sudamericano",
    description:
      "Rooibos sudafricano envejecido con cedrón patagónico y cáscara de naranja. Dulce, terroso, sin cafeína.",
    price: 9900,
    image: img("1571934811356-5cc061b6821f"),
    category: "infusion",
    notes: ["Limón verde", "Vainilla", "Tierra húmeda"],
    ingredients: ["Rooibos rojo", "Cedrón", "Cáscara de naranja"],
    brewing: { temp: "100°C", time: "7 min" },
    caffeine: "ninguna",
    featured: true,
    stock: 36,
  },
  {
    id: "earl-vetiver",
    slug: "earl-vetiver",
    name: "Earl Vetiver",
    tagline: "Negro Ceylán, bergamota & vetiver",
    description:
      "Nuestra relectura del Earl Grey: negro de Ceylán de altura, bergamota fresca de Calabria y un susurro de vetiver ahumado.",
    price: 12500,
    image: img("1597318109703-c3a8b13a9b6b"),
    category: "té",
    notes: ["Cítrico", "Madera ahumada", "Maltado"],
    ingredients: ["Té negro Ceylán OP", "Aceite de bergamota", "Vetiver"],
    brewing: { temp: "95°C", time: "3 min" },
    caffeine: "alta",
    featured: true,
    stock: 24,
  },
  {
    id: "pack-ritual",
    slug: "pack-ritual",
    name: "Ritual · Pack de descubrimiento",
    tagline: "5 fórmulas · 5 momentos del día",
    description:
      "Cinco de nuestras fórmulas favoritas en formato degustación. Para encontrar la tuya.",
    price: 19900,
    image: img("1576092768241-dec231879fc3"),
    category: "pack",
    notes: ["Variado"],
    ingredients: ["5 sobres de fórmulas distintas"],
    brewing: { temp: "Ver cada fórmula", time: "—" },
    caffeine: "media",
    stock: 50,
  },
  {
    id: "infusor-acero",
    slug: "infusor-acero",
    name: "Infusor de acero",
    tagline: "Acero quirúrgico · malla fina",
    description:
      "Infusor de acero quirúrgico con malla fina, diseñado para que las hojas se desplieguen sin restricciones.",
    price: 6500,
    image: img("1544787219-7f47ccb76574"),
    category: "accesorio",
    notes: [],
    ingredients: ["Acero inoxidable 304"],
    brewing: { temp: "—", time: "—" },
    caffeine: "ninguna",
    stock: 100,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getHero() {
  return products.find((p) => p.hero) ?? products[0];
}

export function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
