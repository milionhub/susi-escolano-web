"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/projects";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Premium placeholder ───────────────────────────────────────────────────────
function Placeholder({ number, index }: { number: string; index: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 38% 30%, #F5EFE6 0%, #EBE4D9 42%, #DED7CC 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
        <span
          className="font-sans uppercase text-[#8B8279]"
          style={{ fontSize: "9px", letterSpacing: "0.48em", opacity: 0.5 }}
        >
          Proyecto {number}
        </span>
        <span
          className="font-sans uppercase text-[#8B8279]"
          style={{ fontSize: "7.5px", letterSpacing: "0.3em", opacity: 0.3 }}
        >
          Fotografía {index + 1}
        </span>
      </div>
    </div>
  );
}

// ── Single project block ──────────────────────────────────────────────────────
function ProjectBlock({ project }: { project: Project }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pointerStartX = useRef(0);

  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: "-80px" });

  const total = project.images.length;
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const counter = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const currentImage = project.images[current];

  return (
    <div
      ref={blockRef}
      className="mb-24 md:mb-40 last:mb-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Info row ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease, delay: 0.05 }}
        className="flex items-end justify-between mb-5 md:mb-6 gap-4"
      >
        {/* Left — number, title, meta */}
        <div>
          <p
            className="font-sans text-[#B08B64] mb-2.5 leading-none"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
          >
            {project.number}
          </p>
          <h3
            className="font-display font-light text-[#202020] leading-tight tracking-[-0.01em] mb-1.5"
            style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.85rem)" }}
          >
            {project.title}
          </h3>
          <p
            className="font-sans text-[#6B665F]"
            style={{ fontSize: "10.5px", letterSpacing: "0.12em" }}
          >
            {project.type} · {project.year}
            {project.surface ? ` · ${project.surface}` : ""}
          </p>
        </div>

        {/* Right — counter + arrows */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-[#6B665F] tabular-nums hidden sm:block"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
          >
            {counter}
          </motion.span>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={prev}
              aria-label="Imagen anterior"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.18 }}
              className="w-8 h-8 flex items-center justify-center border border-[#CEC9C2] text-[#202020] hover:border-[#9B9389] transition-colors duration-200"
            >
              <ArrowLeft size={11} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={next}
              aria-label="Imagen siguiente"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.18 }}
              className="w-8 h-8 flex items-center justify-center border border-[#CEC9C2] text-[#202020] hover:border-[#9B9389] transition-colors duration-200"
            >
              <ArrowRight size={11} strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Image area ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={isInView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
        transition={{ duration: 1.0, ease, delay: 0.18 }}
        className="relative overflow-hidden bg-[#E8E2DA] select-none"
        style={{ height: "clamp(360px, 64vh, 720px)", cursor: "grab" }}
        onPointerDown={(e) => {
          pointerStartX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const diff = pointerStartX.current - e.clientX;
          if (Math.abs(diff) > 55) {
            diff > 0 ? next() : prev();
          }
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={`${project.id}-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease }}
          >
            {currentImage.src ? (
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover object-center pointer-events-none"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
            ) : (
              <Placeholder number={project.number} index={current} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Bottom strip ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.62 }}
        className="flex items-center justify-between mt-4 md:mt-5 gap-4"
      >
        {/* Drag hint */}
        <motion.p
          animate={{ opacity: hovered ? 0.65 : 0.28 }}
          transition={{ duration: 0.3 }}
          className="font-sans text-[#6B665F] flex items-center gap-2"
          style={{ fontSize: "9px", letterSpacing: "0.22em" }}
        >
          <span>↔</span>
          <span className="uppercase">Arrastra para explorar</span>
        </motion.p>

        {/* Materials */}
        {project.materials.length > 0 && (
          <p
            className="font-sans text-[#6B665F] text-right"
            style={{ fontSize: "9px", letterSpacing: "0.15em", opacity: 0.45 }}
          >
            {project.materials.join(" · ")}
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="proyectos" className="bg-[#F6F3EE] px-[4%] py-28 md:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="font-sans text-[#B08B64] mb-9"
            style={{ fontSize: "8px", letterSpacing: "0.5em" }}
          >
            PROYECTOS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.85, ease, delay: 0.14 }}
            className="font-display font-light text-[#202020] leading-[1.1] tracking-[-0.01em] max-w-[560px] mb-5"
            style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)" }}
          >
            Cada proyecto refleja una forma de entender el diseño.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
            className="font-sans text-[13px] leading-relaxed text-[#6B665F] max-w-[420px]"
          >
            Una selección de trabajos que refleja nuestra manera de entender
            cada encargo: con cuidado, con criterio y con vocación por el
            detalle.
          </motion.p>
        </div>

        {/* ── Project blocks ──────────────────────────────────────── */}
        {PROJECTS.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}

      </div>
    </section>
  );
}
