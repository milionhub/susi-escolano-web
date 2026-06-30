// ─── Estructura de proyecto ───────────────────────────────────────────────────
//
// Para añadir fotografías reales, únicamente modifica el array `images` de
// cada proyecto. El layout no cambia.
//
//   Antes (placeholder):
//   images: [{ src: "", alt: "" }]
//
//   Después (fotos reales):
//   images: [
//     { src: "/images/projects/el-altet/01.webp", alt: "Salón principal" },
//     { src: "/images/projects/el-altet/02.webp", alt: "Cocina abierta" },
//   ]
//
// ─────────────────────────────────────────────────────────────────────────────

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  year: string;
  surface: string;
  location: string;
  description: string;
  images: ProjectImage[];
  services: string[];
  materials: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "proyecto-01",
    number: "01",
    title: "Vivienda en El Altet",
    type: "Reforma integral · Interiorismo",
    year: "2024",
    surface: "142 m²",
    location: "El Altet, Alicante",
    description:
      "Reforma completa de vivienda unifamiliar con criterios de diseño contemporáneo. Espacios amplios, materiales naturales y máxima atención al detalle.",
    images: [
      { src: "", alt: "Vivienda en El Altet — imagen 01" },
      { src: "", alt: "Vivienda en El Altet — imagen 02" },
      { src: "", alt: "Vivienda en El Altet — imagen 03" },
      { src: "", alt: "Vivienda en El Altet — imagen 04" },
    ],
    services: ["Reforma integral", "Interiorismo", "Proyectos técnicos"],
    materials: ["Microcemento", "Roble natural", "Mármol travertino"],
  },
  {
    id: "proyecto-02",
    number: "02",
    title: "Apartamento en Santa Pola",
    type: "Reforma integral · Interiorismo",
    year: "2024",
    surface: "89 m²",
    location: "Santa Pola, Alicante",
    description:
      "Transformación de apartamento en primera línea de playa. Diseño orientado a la luz natural y la conexión visual con el entorno mediterráneo.",
    images: [
      { src: "", alt: "Apartamento en Santa Pola — imagen 01" },
      { src: "", alt: "Apartamento en Santa Pola — imagen 02" },
      { src: "", alt: "Apartamento en Santa Pola — imagen 03" },
    ],
    services: ["Reforma integral", "Interiorismo"],
    materials: ["Piedra natural", "Lino natural", "Latón cepillado"],
  },
  {
    id: "proyecto-03",
    number: "03",
    title: "Ático en Elche",
    type: "Reforma de cocina y baños",
    year: "2023",
    surface: "210 m²",
    location: "Elche, Alicante",
    description:
      "Renovación de cocina y baños en ático de lujo. Soluciones de interiorismo que respetan la arquitectura existente incorporando materiales de primera calidad.",
    images: [
      { src: "", alt: "Ático en Elche — imagen 01" },
      { src: "", alt: "Ático en Elche — imagen 02" },
      { src: "", alt: "Ático en Elche — imagen 03" },
      { src: "", alt: "Ático en Elche — imagen 04" },
      { src: "", alt: "Ático en Elche — imagen 05" },
    ],
    services: ["Reforma parcial", "Interiorismo", "Coordinación de obra"],
    materials: ["Gres porcelánico", "Nogal vaporizado", "Acero inoxidable"],
  },
];
