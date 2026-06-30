export const COMPANY = {
  name: "SUSI ESCOLANO",
  tagline: "Reformas & Interiorismo",
  phone: "+34 600 000 000",
  whatsapp: "34600000000",
  whatsappMessage:
    "Hola, me gustaría solicitar presupuesto para una reforma.",
  email: "info@susiescola.es",
  location: "Elche, Alicante y Santa Pola",
  zones: ["Elche", "Alicante", "Santa Pola", "Torrevieja"],
} as const;

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

// ─── Hero render ──────────────────────────────────────────────────────────────
// Imagen de sección de vivienda. Para sustituirla: actualiza src y ajusta
// las coordenadas de hotspot y region en ROOMS.
export const HOUSE_RENDER = {
  src: "/images/hero/house-cutaway.png",
  alt: "Render de sección de vivienda — Susi Escolano Reformas & Interiorismo",
} as const;

export interface Room {
  id: string;
  label: string;
  /**
   * Posición del marcador sobre la imagen en % del contenedor.
   * Ajustar si se cambia la imagen o el viewport objetivo.
   */
  hotspot: { x: number; y: number };
  /**
   * Zona destacada sobre la imagen en % del contenedor.
   * Define la región que se oscurece/ilumina al navegar.
   */
  region: { x: number; y: number; w: number; h: number };
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
}

// Coordenadas calibradas sobre house-cutaway.png en viewport 1920×1080.
// La imagen es 2:1 con object-fit:cover → leve recorte lateral (~5% por lado).
export const ROOMS: Room[] = [
  {
    id: "dormitorio",
    label: "Dormitorio",
    hotspot: { x: 24, y: 30 },
    region: { x: 8, y: 8, w: 43, h: 41 },
    title: "Dormitorios\na medida",
    description:
      "Creamos dormitorios que invitan al descanso. Tu espacio más íntimo, diseñado con cuidado y precisión.",
    cta: "Solicitar presupuesto",
    ctaLink: "#contacto",
  },
  {
    id: "aseo",
    label: "Aseo",
    hotspot: { x: 77, y: 27 },
    region: { x: 62, y: 8, w: 28, h: 41 },
    title: "Baños\nque sorprenden",
    description:
      "Convertimos tu baño en un espacio de bienestar. Diseño cuidado, materiales de calidad y funcionalidad perfecta.",
    cta: "Solicitar presupuesto",
    ctaLink: "#contacto",
  },
  {
    id: "cocina",
    label: "Cocina",
    hotspot: { x: 22, y: 59 },
    region: { x: 8, y: 51, w: 41, h: 34 },
    title: "Cocinas\nque enamoran",
    description:
      "Diseñamos cocinas funcionales y elegantes donde cada detalle tiene sentido. Materiales premium, acabados perfectos.",
    cta: "Ver proyectos de cocinas",
    ctaLink: "#proyectos",
  },
  {
    id: "salon",
    label: "Salón",
    hotspot: { x: 77, y: 61 },
    region: { x: 60, y: 51, w: 30, h: 34 },
    title: "Salones\nque inspiran",
    description:
      "Transformamos tu salón en el corazón del hogar. Espacios amplios, luminosos y llenos de personalidad.",
    cta: "Solicitar presupuesto",
    ctaLink: "#contacto",
  },
];

// ─── Servicios ────────────────────────────────────────────────────────────────

export type ServiceIconName = "Hammer" | "ChefHat" | "Droplets" | "Palette";

export interface Service {
  id: string;
  icon: ServiceIconName;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: "reformas-integrales",
    icon: "Hammer",
    title: "Reformas Integrales",
    description:
      "Transformamos tu espacio de principio a fin. Gestión completa del proyecto, materiales premium y resultado impecable.",
  },
  {
    id: "cocinas",
    icon: "ChefHat",
    title: "Cocinas",
    description:
      "Cocinas funcionales y elegantes que se convierten en el corazón del hogar. Diseño personalizado, acabados perfectos.",
  },
  {
    id: "banos",
    icon: "Droplets",
    title: "Baños",
    description:
      "Espacios de bienestar y diseño. Reformas de baño con materiales de calidad y un resultado que sorprende.",
  },
  {
    id: "interiorismo",
    icon: "Palette",
    title: "Interiorismo",
    description:
      "Proyectos de interiorismo que reflejan tu personalidad. Cada detalle, pensado para crear espacios únicos.",
  },
];

export const PLACEHOLDER_SECTIONS = [
  { id: "proyectos", label: "Proyectos", bg: "bg-[#FAFAF8]", text: "text-[#1C1C1A]" },
  { id: "nosotros", label: "Nosotros", bg: "bg-[#F5F3EF]", text: "text-[#1C1C1A]" },
  { id: "contacto", label: "Contacto", bg: "bg-[#1C1C1A]", text: "text-white" },
] as const;
