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
  title: "Susi Escolano | Proyectos & Reformas",
  description:
    "Empresa de proyectos, reformas e interiorismo en Elche desde 2009. Reformas integrales, dirección de obra, diseño de interiores y gestión completa del proyecto.",
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
      "Tu empresa de reformas de confianza en Elche, Alicante y Santa Pola.",
    locale: "es_ES",
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
