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

const SITE_URL = "https://herbale.cl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Herbalé — Hierbas con propósito",
    template: "%s · Herbalé",
  },
  description:
    "Tés e infusiones orgánicas de origen único. Seis fórmulas hechas con hojas enteras y plantas medicinales para cada momento del día.",
  applicationName: "Herbalé",
  authors: [{ name: "Herbalé", url: SITE_URL }],
  creator: "Herbalé",
  publisher: "Herbalé",
  keywords: [
    "té orgánico",
    "hierbas medicinales",
    "infusiones",
    "té Chile",
    "fórmulas herbales",
    "hojas enteras",
    "té digestivo",
    "té relajante",
    "Herbalé",
  ],
  category: "shopping",
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "Herbalé",
    title: "Herbalé — Hierbas con propósito",
    description:
      "Tés e infusiones orgánicas de origen único. Cosechas pequeñas, hojas enteras, fórmulas para cada momento del día.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbalé — Hierbas con propósito",
    description:
      "Tés e infusiones orgánicas de origen único. Cosechas pequeñas, hojas enteras.",
    creator: "@herbale.cl",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Herbalé",
              url: SITE_URL,
              logo: `${SITE_URL}/apple-icon`,
              description:
                "Tés e infusiones orgánicas de origen único. Cosechas pequeñas, hojas enteras, fórmulas para cada momento del día.",
              email: "contacto@herbale.cl",
              telephone: "+56992794307",
              sameAs: ["https://www.instagram.com/herbale.cl/"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CL",
              },
            }),
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
