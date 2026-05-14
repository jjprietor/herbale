import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
