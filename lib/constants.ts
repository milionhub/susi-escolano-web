// ─── Metadata del sitio ─────────────────────────────────────────────────────────
export const SITE = {
  title: "Susi Escolano | Proyectos & Reformas",
  description:
    "Empresa especializada en proyectos, reformas integrales e interiorismo en la provincia de Alicante. Desde 2009 transformamos espacios con un servicio integral, cercano y de confianza.",
} as const;

// ─── Datos de contacto ──────────────────────────────────────────────────────────
export const COMPANY = {
  name: "SUSI ESCOLANO",
  tagline: "Proyectos & Reformas",
  phone: "+34 678 122 876",
  whatsapp: "34678122876",
  whatsappMessage:
    "Hola, me gustaría solicitar información sobre una reforma.\n\nSi es posible, me gustaría pedir un presupuesto.\n\nGracias.",
  email: "info@susiescolano.com",
  landlinePhone: "965 43 71 67",
  address: {
    street: "Carrer la Sénia, 13, Bajo",
    postal: "03201 Elche (Alicante)",
  },
  location: "Elche, Alicante y Santa Pola",
  zones: ["Elche", "Alicante", "Santa Pola", "Torrevieja"],
  schedule: "Lunes a viernes · 9:00–14:00 y 16:00–19:00",
} as const;

export const NAV_LINKS = [
  { label: "Qué hacemos", href: "#que-hacemos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Antes y Después", href: "#antes-despues" },
  { label: "Por qué confiar", href: "#por-que-confiar" },
  { label: "Contacto", href: "#contacto" },
] as const;

// ─── Hero render ──────────────────────────────────────────────────────────────
export const HOUSE_RENDER = {
  src: "/images/hero/hero.webp",
  alt: "Proyecto de reforma e interiorismo — Susi Escolano",
} as const;

