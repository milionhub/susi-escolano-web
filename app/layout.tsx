import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://susiescolano.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  title: "Susi Escolano | Proyectos & Reformas",
  description:
    "Empresa especializada en proyectos, reformas integrales e interiorismo en la provincia de Alicante. Desde 2009 transformamos espacios con un servicio integral, cercano y de confianza.",
  keywords: [
    "reformas Elche",
    "reformas integrales Alicante",
    "reformas cocinas Elche",
    "reformas baños Alicante",
    "empresa reformas Santa Pola",
    "interiorismo Elche",
    "reformas integrales",
    "reformas hogar Alicante",
    "diseño de interiores Elche",
  ],
  openGraph: {
    title: "Susi Escolano | Proyectos & Reformas",

    description:
      "Empresa especializada en proyectos, reformas integrales e interiorismo en la provincia de Alicante. Desde 2009 transformamos espacios con un servicio integral, cercano y de confianza.",

    url: "/",

    siteName: "Susi Escolano",

    locale: "es_ES",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Susi Escolano | Proyectos & Reformas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Susi Escolano | Proyectos & Reformas",
    description:
      "Empresa especializada en proyectos, reformas integrales e interiorismo en la provincia de Alicante. Desde 2009 transformamos espacios con un servicio integral, cercano y de confianza.",
    images: ["/og-image.png"],
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
