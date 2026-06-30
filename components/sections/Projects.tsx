"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/projects";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Reusable modal ────────────────────────────────────────────────────────────
// Acepta cualquier Project. Para reutilizar con project-02 / project-03
// simplemente pasa un objeto Project diferente — cero cambios de lógica.
interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = project.images.length;
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // Scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    const el = thumbnailRefs.current[current];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, next, prev, onClose]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset to first image each time modal opens
  useEffect(() => {
    if (isOpen) setCurrent(0);
  }, [isOpen]);

  const counter = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const currentImage = project.images[current];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#F6F3EE] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
        >
          <motion.div
            className="h-full flex flex-col"
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            exit={{ y: 8 }}
            transition={{ duration: 0.36, ease }}
          >

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-[4%] h-16 flex-shrink-0 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-4">
                <span
                  className="font-sans text-[#B08B64]"
                  style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                >
                  {project.number}
                </span>
                <span
                  className="font-display font-light text-[#202020]"
                  style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)" }}
                >
                  {project.title}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar galería"
                className="text-[#202020]/40 hover:text-[#202020] transition-colors duration-200 p-1"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Main image ─────────────────────────────────────── */}
            <div
              className="relative flex-1 overflow-hidden group min-h-0"
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 55) diff > 0 ? next() : prev();
              }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={`${project.id}-modal-${current}`}
                  className="absolute inset-0 flex items-center justify-center px-[4%] py-3 md:py-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full">
                    {currentImage?.src ? (
                      <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 90vw"
                        priority={current === 0}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            "radial-gradient(ellipse at 38% 30%, #F5EFE6 0%, #EBE4D9 42%, #DED7CC 100%)",
                        }}
                      >
                        <span
                          className="font-sans text-[#8B8279] uppercase"
                          style={{ fontSize: "9px", letterSpacing: "0.45em", opacity: 0.4 }}
                        >
                          Fotografía {current + 1}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Side arrows — desktop, visible on hover */}
              <button
                onClick={prev}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-[#F6F3EE]/90 border border-[#E0DBD3] text-[#202020] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex"
              >
                <ArrowLeft size={12} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center bg-[#F6F3EE]/90 border border-[#E0DBD3] text-[#202020] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex"
              >
                <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Thumbnail strip ─────────────────────────────────── */}
            {total > 0 && (
              <div className="flex-shrink-0 border-t border-[#E8E4DC] px-[4%] py-4">
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      ref={(el) => { thumbnailRefs.current[i] = el; }}
                      onClick={() => setCurrent(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                      className="relative flex-shrink-0 overflow-hidden transition-all duration-200"
                      style={{
                        width: "72px",
                        height: "54px",
                        opacity: i === current ? 1 : 0.38,
                        outline: i === current
                          ? "1.5px solid #B08B64"
                          : "1.5px solid transparent",
                        outlineOffset: "2px",
                      }}
                    >
                      {img.src ? (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(ellipse at 38% 30%, #F0EAE1 0%, #E3DCD4 100%)",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Info strip ──────────────────────────────────────── */}
            <div className="flex-shrink-0 border-t border-[#E8E4DC] px-[4%] py-5">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display font-light text-[#202020] mb-1 truncate"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}
                  >
                    {project.title}
                  </p>
                  <p
                    className="font-sans text-[#6B665F] mb-2"
                    style={{ fontSize: "10px", letterSpacing: "0.14em" }}
                  >
                    {project.type} · {project.year}
                    {project.surface ? ` · ${project.surface}` : ""}
                  </p>
                  <p className="font-sans text-[12px] leading-relaxed text-[#6B665F] max-w-[520px] hidden md:block">
                    {project.description}
                  </p>
                  {/* Preparado para materials y services */}
                </div>

                {/* Counter + arrows */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={prev}
                    aria-label="Imagen anterior"
                    className="w-8 h-8 flex items-center justify-center border border-[#CEC9C2] text-[#202020] hover:border-[#9B9389] transition-colors duration-200"
                  >
                    <ArrowLeft size={11} strokeWidth={1.5} />
                  </button>
                  <span
                    className="font-sans text-[#6B665F] tabular-nums select-none"
                    style={{ fontSize: "9px", letterSpacing: "0.18em" }}
                  >
                    {counter}
                  </span>
                  <button
                    onClick={next}
                    aria-label="Imagen siguiente"
                    className="w-8 h-8 flex items-center justify-center border border-[#CEC9C2] text-[#202020] hover:border-[#9B9389] transition-colors duration-200"
                  >
                    <ArrowRight size={11} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Reusable card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <>
      <div ref={cardRef}>

        {/* ── Cover image ─────────────────────────────────────── */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={isInView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.05, ease, delay: 0.1 }}
          className="relative overflow-hidden bg-[#E4DDD4]"
          style={{ height: "clamp(420px, 72vh, 860px)" }}
        >
          {project.cover?.src ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 92vw"
              priority
            />
          ) : (
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
                  {project.number} — {project.title}
                </span>
                <span
                  className="font-sans uppercase text-[#8B8279]"
                  style={{ fontSize: "7.5px", letterSpacing: "0.3em", opacity: 0.28 }}
                >
                  Fotografía principal
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Info ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.55 }}
          className="pt-7 md:pt-8"
        >
          <p
            className="font-sans text-[#B08B64] mb-2.5 leading-none"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
          >
            {project.number}
          </p>

          <h3
            className="font-display font-light text-[#202020] leading-tight tracking-[-0.01em] mb-1.5"
            style={{ fontSize: "clamp(1.45rem, 2.2vw, 1.8rem)" }}
          >
            {project.title}
          </h3>

          <p
            className="font-sans text-[#6B665F] mb-5 md:mb-6"
            style={{ fontSize: "10.5px", letterSpacing: "0.12em" }}
          >
            {project.type} · {project.year}
            {project.surface ? ` · ${project.surface}` : ""}
          </p>

          <p className="font-sans text-[13px] leading-relaxed text-[#6B665F] max-w-[480px] mb-7 hidden md:block">
            {project.description}
          </p>

          {/* CTA */}
          <motion.button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-[11px] border border-[#202020]/20 font-sans text-[9.5px] tracking-[0.22em] uppercase text-[#202020]"
            whileHover={{
              backgroundColor: "rgba(32,32,32,0.04)",
              borderColor: "rgba(32,32,32,0.38)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Ver proyecto
            <ArrowRight size={10} strokeWidth={1.5} />
          </motion.button>
        </motion.div>

      </div>

      <ProjectModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="proyectos" className="bg-[#F6F3EE] px-[4%] py-28 md:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ── Header ────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14 md:mb-20">
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
            animate={isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
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

        <div className="flex flex-col gap-28 md:gap-40">
          <ProjectCard project={PROJECTS[0]} />
          <ProjectCard project={PROJECTS[1]} />
        </div>

      </div>
    </section>
  );
}
