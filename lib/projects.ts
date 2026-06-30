// ─── Añadir un proyecto nuevo ──────────────────────────────────────────────────
//
// 1. Copia el bloque de project-01 y ajusta los datos.
// 2. Pon las imágenes en /public/images/projects/project-XX/
//    - cover.jpg  → imagen del card en la landing
//    - 01.jpg … NN.jpg → galería completa en el modal
// 3. En Projects.tsx añade <ProjectCard project={PROJECTS[N]} />
//
// Cero cambios de lógica. Solo datos.
// ──────────────────────────────────────────────────────────────────────────────

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
  cover?: ProjectImage; // Imagen del card (landing). Opcional.
  images: ProjectImage[]; // Galería completa (modal). Vacío = placeholder.
  services: string[];
  materials: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "proyecto-01",
    number: "01",
    title: "Vivienda en Elche",
    type: "Reforma integral · Interiorismo",
    year: "2023",
    surface: "90 m²",
    location: "El Altet, Alicante",
    description:
      "Reforma completa de vivienda unifamiliar con criterios de diseño contemporáneo. Espacios amplios, materiales naturales y máxima atención al detalle.",
    cover: {
      src: "/images/projects/project-01/cover.jpg",
      alt: "Vivienda en Elche — vista principal",
    },
    images: [
      {
        src: "/images/projects/project-01/1.jpg",
        alt: "Vivienda en Elche — 01",
      },
      {
        src: "/images/projects/project-01/2.jpg",
        alt: "Vivienda en Elche — 02",
      },
      {
        src: "/images/projects/project-01/3.jpg",
        alt: "Vivienda en Elche — 03",
      },
      {
        src: "/images/projects/project-01/4.jpg",
        alt: "Vivienda en Elche — 04",
      },
      {
        src: "/images/projects/project-01/5.jpg",
        alt: "Vivienda en Elche — 05",
      },
      {
        src: "/images/projects/project-01/6.jpg",
        alt: "Vivienda en Elche — 06",
      },
      {
        src: "/images/projects/project-01/7.jpg",
        alt: "Vivienda en Elche — 07",
      },
      {
        src: "/images/projects/project-01/8.jpg",
        alt: "Vivienda en Elche — 08",
      },
      {
        src: "/images/projects/project-01/9.jpg",
        alt: "Vivienda en Elche — 09",
      },
    ],
    services: ["Reforma integral", "Interiorismo", "Proyectos técnicos"],
    materials: ["Microcemento", "Roble natural", "Mármol travertino"],
  },
  {
    id: "proyecto-02",
    number: "02",
    title: "Vivienda en Murcia",
    type: "Reforma integral · Interiorismo",
    year: "2025",
    surface: "200 m²",
    location: "Murcia",
    description:
      "Unificación y reforma integral de dos viviendas contiguas para crear un único espacio de 200 m². Distribución abierta, materiales naturales y una paleta cálida que conecta ambas plantas con total coherencia.",
    cover: {
      src: "/images/projects/project-02/cover.jpg",
      alt: "Vivienda en Murcia — vista principal",
    },
    images: [
      {
        src: "/images/projects/project-02/1.jpg",
        alt: "Vivienda en Murcia — 01",
      },
      {
        src: "/images/projects/project-02/2.jpg",
        alt: "Vivienda en Murcia — 02",
      },
      {
        src: "/images/projects/project-02/3.jpg",
        alt: "Vivienda en Murcia — 03",
      },
      {
        src: "/images/projects/project-02/4.jpg",
        alt: "Vivienda en Murcia — 04",
      },
      {
        src: "/images/projects/project-02/5.jpg",
        alt: "Vivienda en Murcia — 05",
      },
      {
        src: "/images/projects/project-02/6.jpg",
        alt: "Vivienda en Murcia — 06",
      },
      {
        src: "/images/projects/project-02/7.jpg",
        alt: "Vivienda en Murcia — 07",
      },
    ],
    services: ["Reforma integral", "Interiorismo", "Gestión de obra"],
    materials: ["Microcemento", "Madera natural", "Piedra caliza"],
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
    images: [],
    services: ["Reforma parcial", "Interiorismo", "Coordinación de obra"],
    materials: ["Gres porcelánico", "Nogal vaporizado", "Acero inoxidable"],
  },
];
