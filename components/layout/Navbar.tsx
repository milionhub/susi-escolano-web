"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: scrolled
            ? "rgba(246,243,238,0.96)"
            : "rgba(246,243,238,0)",
          backdropFilter: scrolled ? "blur(6px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(200,193,185,0.3)"
            : "0 1px 0 rgba(200,193,185,0)",
        }}
        transition={{
          opacity: { duration: 0.75, ease: "easeOut" },
          y: { duration: 0.75, ease },
          backgroundColor: { duration: 0.6, ease },
          backdropFilter: { duration: 0.6, ease: "easeOut" },
          boxShadow: { duration: 0.6, ease: "easeOut" },
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-[1440px] px-[4%] h-20 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">

          {/* Logo */}
          <Link href="#inicio" className="flex flex-col leading-none flex-none">
            <span className="font-display font-light text-[13px] tracking-[0.28em] uppercase text-[#202020]">
              {COMPANY.name}
            </span>
            <span className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#6B665F] mt-[3px]">
              {COMPANY.tagline}
            </span>
          </Link>

          {/* Nav — centered */}
          <nav className="hidden md:flex justify-center items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[9px] tracking-[0.22em] uppercase text-[#202020] hover:text-[#B08B64] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center justify-end gap-5">
            <a
              href="#contacto"
              className="hidden md:block font-sans text-[9px] tracking-[0.22em] uppercase text-[#202020] hover:text-[#B08B64] transition-colors duration-300"
            >
              Solicitar presupuesto
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-[#202020]"
              aria-label="Abrir menú"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#F6F3EE] flex flex-col px-[6%] pt-7 pb-12"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-[#202020]"
              aria-label="Cerrar menú"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col mt-14">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display font-light text-[2.5rem] text-[#202020] py-4 border-b border-[#E8E4DC] hover:text-[#B08B64] transition-colors leading-none"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-10 font-sans text-[9px] tracking-[0.3em] uppercase text-[#B08B64]"
            >
              Solicitar presupuesto →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
