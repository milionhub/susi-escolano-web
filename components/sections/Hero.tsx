"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { HOUSE_RENDER } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function Hero() {
  const { scrollY } = useScroll();

  // Scroll-driven parallax — very subtle depth sensation
  const rawScale = useTransform(scrollY, [0, 500], [1, 0.975]);
  const rawY = useTransform(scrollY, [0, 500], [0, -18]);
  const imageScale = useSpring(rawScale, { stiffness: 85, damping: 28 });
  const imageY = useSpring(rawY, { stiffness: 85, damping: 28 });

  return (
    <section id="inicio" className="min-h-screen bg-[#F6F3EE]">

      {/* Navbar spacer */}
      <div className="h-20" />

      {/* ── Image ─────────────────────────────────────────────────── */}
      <motion.div
        className="hero-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.08 }}
        style={{ scale: imageScale, y: imageY }}
      >
        <Image
          src={HOUSE_RENDER.src}
          alt={HOUSE_RENDER.alt}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 92vw"
        />
      </motion.div>

      {/* ── Text ──────────────────────────────────────────────────── */}
      <div className="px-[4%] pt-7 md:pt-9 pb-16 md:pb-14">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="font-sans text-[8px] tracking-[0.5em] uppercase text-[#B08B64] mb-6 md:mb-7"
        >
          Reformas · Interiorismo · Proyectos
        </motion.p>

        {/* Title + CTAs row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-24 lg:gap-32">

          {/* Left: title + description */}
          <div>
            {/* Clip-path / slide-up reveal */}
            <div className="overflow-hidden mb-5 md:mb-6">
              <motion.h1
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.88, ease, delay: 0.44 }}
                className="font-display font-light text-[#202020] text-[2.4rem] md:text-[2.9rem] lg:text-[3.4rem] leading-[1.08] tracking-[-0.01em]"
              >
                Diseñamos espacios
                <br />
                para toda la vida.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.68 }}
              className="font-sans text-[13px] leading-relaxed text-[#6B665F] max-w-[440px]"
            >
              Diseñamos, coordinamos y ejecutamos cada proyecto de principio
              a fin para que tú solo tengas que disfrutar del resultado.
            </motion.p>
          </div>

          {/* Right: CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.86 }}
            className="flex flex-row md:flex-col items-start md:items-end gap-5 md:gap-4 flex-shrink-0"
          >
            <motion.a
              href="#contacto"
              className="inline-block px-6 py-[11px] border border-[#202020]/20 font-sans text-[9.5px] tracking-[0.22em] uppercase text-[#202020]"
              whileHover={{
                backgroundColor: "rgba(32,32,32,0.05)",
                borderColor: "rgba(32,32,32,0.42)",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              Solicitar presupuesto
            </motion.a>

            <a
              href="#proyectos"
              className="font-sans text-[9.5px] tracking-[0.22em] uppercase text-[#6B665F] hover:text-[#202020] transition-colors duration-300"
            >
              Ver proyectos →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
