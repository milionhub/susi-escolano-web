"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? "rgba(250, 250, 248, 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(28, 28, 26, 0.08)"
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="#inicio" className="flex flex-col leading-none group">
            <span
              className={cn(
                "font-display text-base font-medium tracking-[0.25em] uppercase transition-colors duration-300",
                scrolled ? "text-[#1c1c1a]" : "text-white",
              )}
            >
              {COMPANY.name}
            </span>
            <span
              className={cn(
                "text-[9px] font-sans tracking-[0.4em] uppercase transition-colors duration-300",
                scrolled ? "text-[#8b7355]" : "text-white/55",
              )}
            >
              {COMPANY.tagline}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] font-sans tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60",
                  scrolled ? "text-[#1c1c1a]" : "text-white/80",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={`tel:${COMPANY.phone}`}
              className={cn(
                "flex items-center gap-1.5 text-[10px] font-sans tracking-wider transition-colors duration-300",
                scrolled ? "text-[#8b7355]" : "text-white/60",
              )}
            >
              <Phone size={11} />
              {COMPANY.phone}
            </a>
            <a
              href="#contacto"
              className={cn(
                "px-5 py-2.5 text-[10px] font-sans tracking-[0.2em] uppercase transition-all duration-300",
                scrolled
                  ? "bg-[#c5a880] text-white hover:bg-[#8b7355]"
                  : "border border-white/40 text-white hover:bg-white/10",
              )}
            >
              Presupuesto
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "md:hidden p-2 -mr-2 transition-colors duration-300",
              scrolled ? "text-[#1c1c1a]" : "text-white",
            )}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 bg-[#fafaf8] z-40 flex flex-col pt-20 px-8 pb-10"
          >
            <nav className="flex flex-col flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-[2.75rem] font-light text-[#1c1c1a] py-4 border-b border-[#e8e4dc] hover:text-[#8b7355] transition-colors leading-none"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="flex flex-col gap-3 mt-8"
            >
              <a
                href={`tel:${COMPANY.phone}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[#8b7355] text-sm font-sans"
              >
                <Phone size={14} />
                {COMPANY.phone}
              </a>
              <a
                href={whatsappUrl}
                onClick={() => setMenuOpen(false)}
                className="bg-[#c5a880] text-white text-center py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-[#8b7355] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar presupuesto
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
