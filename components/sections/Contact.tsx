"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "@/lib/constants";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  COMPANY.whatsappMessage
)}`;
const PHONE_HREF = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;
const EMAIL_HREF = `mailto:${COMPANY.email}`;

const CONTACT_METHODS = [
  { label: "WhatsApp", value: "Escríbenos por WhatsApp", href: WHATSAPP_HREF },
  { label: "Teléfono", value: COMPANY.phone, href: PHONE_HREF },
  { label: "Correo electrónico", value: COMPANY.email, href: EMAIL_HREF },
  { label: "Horario", value: COMPANY.schedule, href: null },
] as const;

// ── Contact method icon ───────────────────────────────────────────────────────

function ContactMethodIcon({ label }: { label: string }) {
  const className = "text-[#B08B64] flex-shrink-0";
  switch (label) {
    case "WhatsApp":
      return <FaWhatsapp size={14} className={className} />;
    case "Teléfono":
      return <Phone size={14} strokeWidth={1.5} className={className} />;
    case "Correo electrónico":
      return <Mail size={14} strokeWidth={1.5} className={className} />;
    case "Horario":
      return <Clock size={14} strokeWidth={1.5} className={className} />;
    default:
      return null;
  }
}

// ── WhatsApp CTA — the button the visitor should press first ────────────────

function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: hovered ? "#43594A" : "#4F6D57",
        y: hovered ? -2 : 0,
        scale: hovered ? 1.015 : 1,
        boxShadow: hovered
          ? "0 18px 34px -14px rgba(79,109,87,0.5)"
          : "0 8px 20px -14px rgba(79,109,87,0.25)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="inline-flex w-full items-center justify-center gap-3.5 px-10 py-5 text-[#F6F3EE] font-sans uppercase sm:w-auto"
      style={{ fontSize: "10.5px", letterSpacing: "0.22em" }}
    >
      <FaWhatsapp size={16} />
      Hablar por WhatsApp
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="inline-flex"
      >
        <ArrowRight size={13} strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="bg-[#F6F3EE] px-[6%] py-20 md:px-[8%] md:py-36"
    >
      <div className="mx-auto max-w-[560px]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
          className="mb-5 font-sans text-[#B08B64] md:mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.5em" }}
        >
          CONTACTO
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
          className="mb-4 font-display font-light leading-[1.1] tracking-[-0.02em] text-[#202020]"
          style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)" }}
        >
          ¿Empezamos a dar forma a tu proyecto?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.26 }}
          className="mb-12 max-w-[400px] font-sans text-[#6B665F] md:mb-16"
          style={{ fontSize: "13.5px", lineHeight: "1.78", letterSpacing: "0.01em" }}
        >
          Cuéntanos qué necesitas y prepararemos una propuesta adaptada a tu
          vivienda.
        </motion.p>

        {/* Primary CTA — WhatsApp, the button most people should press first */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
          className="mb-14 md:mb-16"
        >
          <WhatsAppButton />
        </motion.div>

        {/* Contact methods — icons, air, hairline dividers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.46 }}
          className="border-t border-[#202020]/8"
        >
          {CONTACT_METHODS.map((method) => (
            <div
              key={method.label}
              className="group flex items-center justify-between gap-6 border-b border-[#202020]/8 py-6 transition-colors duration-300 hover:bg-[#202020]/[0.015]"
            >
              <div className="flex flex-shrink-0 items-center gap-3">
                <ContactMethodIcon label={method.label} />
                <span
                  className="font-sans text-[#9B9389]"
                  style={{ fontSize: "9px", letterSpacing: "0.2em" }}
                >
                  {method.label.toUpperCase()}
                </span>
              </div>
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-right font-sans text-[#202020] transition-colors duration-300 group-hover:text-[#B08B64]"
                  style={{ fontSize: "13px", letterSpacing: "0.01em" }}
                >
                  {method.value}
                </a>
              ) : (
                <span
                  className="text-right font-sans text-[#202020]"
                  style={{ fontSize: "13px", letterSpacing: "0.01em" }}
                >
                  {method.value}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
