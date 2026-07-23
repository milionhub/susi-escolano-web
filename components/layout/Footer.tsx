"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { COMPANY } from "@/lib/constants";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const PHONE_HREF = `tel:${COMPANY.landlinePhone.replace(/\s+/g, "")}`;
const EMAIL_HREF = `mailto:${COMPANY.email}`;
const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  COMPANY.whatsappMessage
)}`;
const MAPS_HREF = "https://maps.app.goo.gl/X3MSERBrWvCSRYnY7";

const FOOTER_NAV = [
  { label: "Qué hacemos", href: "#que-hacemos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Antes y después", href: "#antes-despues" },
  { label: "Contacto", href: "#contacto" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/susiescolanoproyectosyreformas/?locale=es_ES",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/susiescolanoproyectosyreformas/",
  },
  { label: "Google Maps", href: MAPS_HREF },
] as const;

// ── Social icon glyph ─────────────────────────────────────────────────────────

function SocialIconGlyph({ label }: { label: string }) {
  switch (label) {
    case "Facebook":
      return <FaFacebookF size={13} />;
    case "Instagram":
      return <FaInstagram size={14} />;
    case "Google Maps":
      return <MapPin size={15} strokeWidth={1.5} />;
    default:
      return null;
  }
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -3 : 0,
        scale: hovered ? 1.06 : 1,
        backgroundColor: hovered ? "rgba(176,139,100,0.08)" : "rgba(176,139,100,0)",
        borderColor: hovered ? "#B08B64" : "rgba(32,32,32,0.12)",
        color: hovered ? "#B08B64" : "#202020",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-10 w-10 items-center justify-center border"
    >
      <SocialIconGlyph label={label} />
    </motion.a>
  );
}

// ── Underlined text link — thin line grows in from the left on hover ─────────

function TextLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="relative inline-block font-sans text-[#202020] transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#B08B64] after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-[#B08B64] hover:after:scale-x-100"
      style={{ fontSize: "13px", letterSpacing: "0.01em" }}
    >
      {children}
    </a>
  );
}

function EyebrowLabel({ children }: { children: string }) {
  return (
    <p
      className="mb-6 font-sans text-[#B08B64]"
      style={{ fontSize: "9px", letterSpacing: "0.3em" }}
    >
      {children.toUpperCase()}
    </p>
  );
}

function ContactRow({
  label,
  href,
  external,
  value,
  note,
}: {
  label: string;
  href: string;
  external?: boolean;
  value: string;
  note?: string;
}) {
  return (
    <div>
      <p
        className="mb-1 font-sans text-[#9B9389]"
        style={{ fontSize: "9px", letterSpacing: "0.16em" }}
      >
        {label.toUpperCase()}
      </p>
      <TextLink href={href} external={external}>
        {value}
      </TextLink>
      {note && (
        <p
          className="mt-1 font-sans text-[#B5AFA6]"
          style={{ fontSize: "10px", letterSpacing: "0.01em" }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <footer ref={sectionRef} className="bg-[#E8E1D5]">
      <div className="mx-auto max-w-[1440px] px-[6%] pt-24 pb-10 md:px-[8%] md:pt-36 md:pb-14">
        {/* ── Top level ──────────────────────────────────────────── */}
        <div className="mb-16 grid grid-cols-1 gap-14 md:mb-24 md:grid-cols-12 md:gap-10">
          {/* Logo, tagline, brief phrase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="md:col-span-4"
          >
            <Link href="#inicio" className="mb-6 flex items-center gap-2.5">
              <Image
                src="/images/logo/isotipo.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 flex-none"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[14px] font-light tracking-[0.28em] text-[#202020] uppercase">
                  {COMPANY.name}
                </span>
                <span className="mt-[3px] font-sans text-[7.5px] tracking-[0.32em] text-[#6B665F] uppercase">
                  {COMPANY.tagline}
                </span>
              </span>
            </Link>
            <p
              className="max-w-[260px] font-sans text-[#6B665F]"
              style={{ fontSize: "12.5px", lineHeight: "1.75" }}
            >
              Reformas e interiorismo en Elche desde 2009.
            </p>
          </motion.div>

          {/* Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.13 }}
            className="md:col-span-2"
          >
            <EyebrowLabel>Navegación</EyebrowLabel>
            <div className="flex flex-col gap-3.5">
              {FOOTER_NAV.map((link) => (
                <TextLink key={link.href} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.21 }}
            className="md:col-span-3"
          >
            <EyebrowLabel>Contacto</EyebrowLabel>

            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 block font-sans text-[#202020] transition-colors duration-300 hover:text-[#B08B64]"
              style={{ fontSize: "13px", lineHeight: "1.7" }}
            >
              {COMPANY.address.street}
              <br />
              {COMPANY.address.postal}
            </a>

            <div className="flex flex-col gap-5">
              <ContactRow
                label="Teléfono fijo"
                href={PHONE_HREF}
                value={COMPANY.landlinePhone}
              />
              <ContactRow
                label="WhatsApp"
                href={WHATSAPP_HREF}
                external
                value={COMPANY.phone}
              />
              <ContactRow label="Correo" href={EMAIL_HREF} value={COMPANY.email} />
            </div>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.29 }}
            className="flex flex-col md:col-span-3 md:items-end"
          >
            <EyebrowLabel>Síguenos</EyebrowLabel>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom level ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="flex flex-col items-start justify-between gap-3 border-t border-[#202020]/10 pt-8 sm:flex-row sm:items-center"
        >
          <p
            className="font-sans text-[#8A8478]"
            style={{ fontSize: "10.5px", letterSpacing: "0.02em" }}
          >
            © 2026 Susi Escolano SL
          </p>
          <p
            className="font-sans text-[#8A8478]"
            style={{ fontSize: "10.5px", letterSpacing: "0.02em" }}
          >
            Reformas pensadas para disfrutarse durante muchos años.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
