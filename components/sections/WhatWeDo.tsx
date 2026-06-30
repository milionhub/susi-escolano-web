"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const AREAS = [
  {
    number: "01",
    title: "Reformas integrales",
    description:
      "Coordinamos todos los oficios para ejecutar reformas completas con un único equipo.",
  },
  {
    number: "02",
    title: "Interiorismo",
    description:
      "Diseñamos espacios funcionales, cálidos y adaptados a cada forma de vivir.",
  },
  {
    number: "03",
    title: "Proyectos técnicos",
    description:
      "Desarrollamos la documentación técnica necesaria para cada proyecto.",
  },
  {
    number: "04",
    title: "Licencias y certificados",
    description:
      "Gestionamos los trámites técnicos necesarios para viviendas, locales y actividades.",
  },
  {
    number: "05",
    title: "Tasaciones e informes",
    description:
      "Realizamos valoraciones e informes técnicos cuando el proyecto lo requiere.",
  },
  {
    number: "06",
    title: "Dirección y coordinación de obra",
    description:
      "Supervisamos cada fase para garantizar calidad, plazos y tranquilidad.",
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
      className="bg-[#EFE8DF] px-[4%] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="font-sans text-[8px] tracking-[0.5em] uppercase text-[#B08B64] mb-9 md:mb-10"
          >
            Qué hacemos
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, ease, delay: 0.14 }}
            className="font-display font-light text-[#202020] text-[2rem] md:text-[2.55rem] lg:text-[3rem] leading-[1.1] tracking-[-0.01em] max-w-[600px] mb-5"
          >
            Todo lo necesario para hacer realidad tu proyecto.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.26 }}
            className="font-sans text-[13px] leading-relaxed text-[#6B665F] max-w-[540px]"
          >
            Desde la idea inicial hasta la ejecución, reunimos en un mismo equipo
            todas las disciplinas necesarias para desarrollar proyectos de
            arquitectura, interiorismo y reformas.
          </motion.p>
        </div>

        {/* ── 3×2 Grid ───────────────────────────────────────────── */}
        {/*
          border-t + border-l on the container.
          Each cell adds border-b + border-r.
          Result: clean full-grid of hairline borders.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CEC9C2]">
          {AREAS.map((area, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const isHovered = hovered === i;

            return (
              <motion.div
                key={area.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: 0.38 + row * 0.1 + col * 0.06,
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative border-b border-r border-[#CEC9C2] overflow-hidden"
              >
                {/* Background tint on hover */}
                <motion.div
                  className="absolute inset-0 bg-[#B08B64]/[0.035] pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />

                {/* Top accent line — grows from left on hover */}
                <motion.span
                  className="absolute top-0 left-0 h-px bg-[#B08B64] w-full pointer-events-none"
                  style={{ originX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.42, ease }}
                />

                <div className="relative p-9 lg:p-11 xl:p-12 flex flex-col h-full">

                  {/* Number */}
                  <motion.span
                    animate={{ opacity: isHovered ? 1 : 0.38 }}
                    transition={{ duration: 0.3 }}
                    className="font-sans text-[9px] tracking-[0.18em] text-[#B08B64] mb-7 md:mb-8 leading-none"
                  >
                    {area.number}
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    animate={{ x: isHovered ? 6 : 0 }}
                    transition={{ duration: 0.32, ease }}
                    className="font-display font-light text-[#202020] text-[1.35rem] md:text-[1.45rem] leading-snug mb-3 md:mb-4"
                  >
                    {area.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    animate={{ opacity: isHovered ? 1 : 0.48 }}
                    transition={{ duration: 0.35 }}
                    className="font-sans text-[12.5px] leading-relaxed text-[#6B665F]"
                  >
                    {area.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
