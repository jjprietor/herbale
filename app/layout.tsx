import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

// EB Garamond — body + fallback for Higuen until the woff2 ships.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herbale.vercel.app"),
  title: {
    default: "Herbalé — Hierbas con propósito",
    template: "%s · Herbalé",
  },
  description:
    "Tés e infusiones orgánicas de origen único. Cosechas pequeñas, hierbas vivas, fórmulas para cada momento del día.",
  openGraph: {
    title: "Herbalé — Hierbas con propósito",
    description:
      "Tés e infusiones orgánicas de origen único. Cosechas pequeñas, hierbas vivas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
