import { COMPANY, SITE } from "@/lib/constants";

// Datos estructurados (JSON-LD) de la empresa — Schema.org.
// Tipo elegido: HomeAndConstructionBusiness (subtipo de LocalBusiness).
// La empresa combina construcción (reformas integrales, dirección de obra)
// e interiorismo/diseño, por lo que un subtipo más estrecho como
// GeneralContractor (orientado solo a construcción) sería menos preciso.

const BASE_URL = "https://susiescolano.com";
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const SERVICES = [
  "Reformas integrales",
  "Interiorismo",
  "Dirección de obra",
  "Proyectos técnicos",
  "Licencias y certificados",
  "Tasaciones e informes",
] as const;

interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: readonly string[];
  opens: string;
  closes: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  email: string;
  areaServed: string;
  availableLanguage: string[];
}

interface AreaServed {
  "@type": "AdministrativeArea" | "City";
  name: string;
}

interface OfferCatalog {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: {
    "@type": "Offer";
    itemOffered: {
      "@type": "Service";
      name: string;
    };
  }[];
}

export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "HomeAndConstructionBusiness";
  "@id": string;
  name: string;
  legalName: string;
  url: string;
  description: string;
  image: string;
  logo: string;
  telephone: string;
  email: string;
  foundingDate: string;
  address: PostalAddress;
  openingHoursSpecification: OpeningHoursSpecification[];
  areaServed: AreaServed[];
  contactPoint: ContactPoint[];
  sameAs: string[];
  hasOfferCatalog: OfferCatalog;
}

export function getLocalBusinessSchema(): LocalBusinessSchema {
  const telephone = `+34${COMPANY.landlinePhone.replace(/\s+/g, "")}`;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Susi Escolano Proyectos & Reformas",
    legalName: "Susi Escolano S.L.",
    url: BASE_URL,
    description: SITE.description,
    image: `${BASE_URL}/og-image.png`,
    logo: `${BASE_URL}/images/logo/isotipo.png`,
    telephone,
    email: COMPANY.email,
    foundingDate: "2009",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer la Sénia, 13, Bajo",
      postalCode: "03201",
      addressLocality: "Elche",
      addressRegion: "Alicante",
      addressCountry: "ES",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: "16:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "AdministrativeArea", name: "Provincia de Alicante" },
      { "@type": "AdministrativeArea", name: "Región de Murcia" },
      { "@type": "City", name: "Elche" },
      { "@type": "City", name: "Alicante" },
      { "@type": "City", name: "Santa Pola" },
      { "@type": "City", name: "El Altet" },
      { "@type": "City", name: "Torrellano" },
      { "@type": "City", name: "Torrevieja" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone,
        contactType: "customer service",
        email: COMPANY.email,
        areaServed: "ES",
        availableLanguage: ["Spanish"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/susiescolanoproyectosyreformas",
      "https://www.facebook.com/susiescolanoproyectosyreformas/",
      `https://wa.me/${COMPANY.whatsapp}`,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: SERVICES.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}
