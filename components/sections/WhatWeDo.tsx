"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const AREAS = [
  {
    number: "01",
    title: "Reformas integrales",
    tag: "Viviendas · Locales · Integral",
    description: "Un único equipo para una reforma completa.",
    core: true,
  },
  {
    number: "02",
    title: "Interiorismo",
    tag: "Diseño · Materiales · Distribución",
    description: "Espacios pensados para vivir mejor.",
    core: true,
  },
  {
    number: "03",
    title: "Dirección de obra",
    tag: "Planificación · Coordinación · Ejecución",
    description: "Supervisamos cada detalle del proyecto.",
    core: true,
  },
  {
    number: "04",
    title: "Proyectos técnicos",
    tag: "Planos · Memorias · Licencias",
    description: "Toda la documentación necesaria.",
    core: false,
  },
  {
    number: "05",
    title: "Licencias y certificados",
    tag: "Actividad · Ocupación · Legalización",
    description: "Gestionamos los trámites por ti.",
    core: false,
  },
  {
    number: "06",
    title: "Tasaciones e informes",
    tag: "Valoraciones · Informes · Peritaciones",
    description: "Informes técnicos cuando los necesitas.",
    core: false,
  },
] as const;

export function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="que-hacemos"
      ref={sectionRef}
      className="bg-[#EFE8DF] px-[4%] py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="mb-5 font-sans text-[8px] tracking-[0.5em] text-[#B08B64] uppercase md:mb-6"
          >
            Qué hacemos
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, ease, delay: 0.14 }}
            className="font-display mb-4 max-w-[620px] text-[2rem] leading-[1.1] font-normal tracking-[-0.01em] text-[#202020] md:text-[2.55rem] lg:text-[3rem]"
          >
            Todo lo necesario para hacerlo realidad.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.26 }}
            className="max-w-[480px] font-sans text-[13px] leading-relaxed text-[#6B665F]"
          >
            Reunimos todo lo necesario para transformar una idea en un espacio
            pensado para durar.
          </motion.p>
        </div>

        {/* ── 3×2 Grid ───────────────────────────────────────────── */}
        {/*
          border-t + border-l on the container.
          Each cell adds border-b + border-r.
          Result: clean full-grid of hairline borders.
        */}
        <div className="grid grid-cols-1 border-t border-l border-[#CEC9C2] md:grid-cols-3">
          {AREAS.map((area, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && hovered !== i;

            return (
              <motion.div
                key={area.number}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={
                  isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{
                  duration: 0.7,
                  ease,
                  delay: 0.32 + row * 0.08 + col * 0.045,
                }}
                className="min-h-[340px] border-r border-b border-[#CEC9C2] md:min-h-[380px] lg:min-h-[420px]"
              >
                <motion.div
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  animate={{ opacity: isDimmed ? 0.93 : 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative h-full overflow-hidden"
                >
                  {/* Background tint on hover */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-[#B08B64]/[0.03]"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />

                  {/* Top accent line — grows from left on hover */}
                  <motion.span
                    className="pointer-events-none absolute top-0 left-0 h-px w-full bg-[#B08B64]"
                    style={{ originX: 0 }}
                    animate={{
                      scaleX: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease }}
                  />

                  <div className="relative flex h-full flex-col items-center justify-center p-10 text-center md:p-12 lg:p-16 xl:p-20">
                    {/* Number — oversized watermark, pure composition */}
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: isHovered ? 0.16 : 0.08 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="font-display mb-2 text-[4.4rem] leading-none font-light text-[#202020] select-none md:mb-3 md:text-[5rem]"
                    >
                      {area.number}
                    </motion.span>

                    {/* Title */}
                    <motion.h3
                      animate={{ y: isHovered ? -4 : 0 }}
                      transition={{ duration: 0.45, ease }}
                      className={`font-display text-[1.5rem] leading-snug text-[#202020] md:text-[1.65rem] ${
                        area.core ? "font-normal" : "font-light"
                      }`}
                    >
                      {area.title}
                    </motion.h3>

                    {/* Tag — editorial subtitle, reads before the description */}
                    <motion.p
                      animate={{ opacity: isHovered ? 0.85 : 0.8 }}
                      transition={{ duration: 0.45 }}
                      className="mt-2 mb-4 font-sans text-[12px] font-medium tracking-[0.04em] text-[#B08B64] md:mb-5"
                    >
                      {area.tag}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      animate={{
                        opacity: isHovered ? 1 : area.core ? 0.78 : 0.62,
                      }}
                      transition={{ duration: 0.45 }}
                      className="max-w-[260px] font-sans text-[15px] leading-[1.6] font-light text-[#6B665F] md:text-[16px]"
                    >
                      {area.description}
                    </motion.p>

                    {/* Arrow — editorial detail, appears on hover */}
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 6,
                      }}
                      transition={{ duration: 0.45, ease }}
                      className="mt-6 font-sans text-[13px] text-[#B08B64] md:mt-7"
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
