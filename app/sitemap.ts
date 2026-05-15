import type { MetadataRoute } from "next";
import { formulas } from "@/lib/products";

const SITE_URL = "https://herbale.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/formulas`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/precios`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const formulaRoutes: MetadataRoute.Sitemap = formulas.map((f) => ({
    url: `${SITE_URL}/formulas/${f.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...formulaRoutes];
}
