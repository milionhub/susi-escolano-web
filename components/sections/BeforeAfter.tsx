"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

export interface Transformation {
  id: string;
  projectName: string;
  type: string;
  location: string;
  year: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "t-01",
    projectName: "Vivienda en Elche",
    type: "Reforma integral",
    location: "El Altet, Alicante",
    year: "2023",
    before: { src: "", alt: "Antes — Vivienda en Elche" },
    after: { src: "", alt: "Después — Vivienda en Elche" },
  },
  {
    id: "t-02",
    projectName: "Cocina en Santa Pola",
    type: "Reforma de cocina",
    location: "Santa Pola, Alicante",
    year: "2023",
    before: { src: "", alt: "Antes — Cocina en Santa Pola" },
    after: { src: "", alt: "Después — Cocina en Santa Pola" },
  },
  {
    id: "t-03",
    projectName: "Baño en Alicante",
    type: "Reforma de baño",
    location: "Alicante",
    year: "2024",
    before: { src: "", alt: "Antes — Baño en Alicante" },
    after: { src: "", alt: "Después — Baño en Alicante" },
  },
  {
    id: "t-04",
    projectName: "Salón en Crevillente",
    type: "Interiorismo",
    location: "Crevillente, Alicante",
    year: "2024",
    before: { src: "", alt: "Antes — Salón en Crevillente" },
    after: { src: "", alt: "Después — Salón en Crevillente" },
  },
  {
    id: "t-05",
    projectName: "Dormitorio en El Altet",
    type: "Interiorismo",
    location: "El Altet, Alicante",
    year: "2024",
    before: { src: "", alt: "Antes — Dormitorio en El Altet" },
    after: { src: "", alt: "Después — Dormitorio en El Altet" },
  },
  {
    id: "t-06",
    projectName: "Vivienda en Murcia",
    type: "Reforma integral",
    location: "Murcia",
    year: "2025",
    before: { src: "", alt: "Antes — Vivienda en Murcia" },
    after: { src: "", alt: "Después — Vivienda en Murcia" },
  },
  {
    id: "t-07",
    projectName: "Baño en Arenales del Sol",
    type: "Reforma de baño",
    location: "Arenales del Sol, Alicante",
    year: "2025",
    before: { src: "", alt: "Antes — Baño en Arenales del Sol" },
    after: { src: "", alt: "Después — Baño en Arenales del Sol" },
  },
  {
    id: "t-08",
    projectName: "Cocina en Elche",
    type: "Reforma de cocina",
    location: "Elche, Alicante",
    year: "2025",
    before: { src: "", alt: "Antes — Cocina en Elche" },
    after: { src: "", alt: "Después — Cocina en Elche" },
  },
  {
    id: "t-09",
    projectName: "Vivienda en Torrevieja",
    type: "Reforma integral",
    location: "Torrevieja, Alicante",
    year: "2026",
    before: { src: "", alt: "Antes — Vivienda en Torrevieja" },
    after: { src: "", alt: "Después — Vivienda en Torrevieja" },
  },
];

// ── Shared ease ───────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Before / After slider ─────────────────────────────────────────────────────

interface SliderProps {
  transformation: Transformation;
}

function BeforeAfterSlider({ transformation }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage 1–99
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(1, Math.min(99, pct)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <div
      ref={containerRef}
      className="relative touch-none overflow-hidden select-none"
      style={{
        aspectRatio: "16 / 10",
        cursor: "col-resize",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="slider"
      aria-label="Comparador antes y después"
      aria-valuenow={Math.round(position)}
      aria-valuemin={1}
      aria-valuemax={99}
    >
      {/* ── After (base layer — always full width) ────────────── */}
      <div
        className="absolute inset-0 flex items-end"
        style={{ background: "#D8D1C8" }}
      >
        <span
          className="absolute right-5 bottom-4 font-sans text-white/50"
          style={{ fontSize: "8px", letterSpacing: "0.4em" }}
        >
          DESPUÉS
        </span>
        {/* Future: <Image src={transformation.after.src} alt={transformation.after.alt} fill className="object-cover" /> */}
      </div>

      {/* ── Before (clipped to the left of the handle) ───────── */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: "#ABA39B",
        }}
      >
        <span
          className="absolute bottom-4 left-5 font-sans text-white/50"
          style={{ fontSize: "8px", letterSpacing: "0.4em" }}
        >
          ANTES
        </span>
        {/* Future: <Image src={transformation.before.src} alt={transformation.before.alt} fill className="object-cover" /> */}
      </div>

      {/* ── Divider + handle ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/65" />

        {/* Circle handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
            style={{
              boxShadow:
                "0 2px 20px rgba(0,0,0,0.10), 0 1px 5px rgba(0,0,0,0.07)",
            }}
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              aria-hidden
            >
              <path
                d="M4.5 1L1 4L4.5 7"
                stroke="#6B665F"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 1L13 4L9.5 7"
                stroke="#6B665F"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function BeforeAfter() {
  const [current, setCurrent] = useState(0);
  const total = TRANSFORMATIONS.length;

  const navigate = (next: number) => {
    if (next < 0 || next >= total) return;
    setCurrent(next);
  };

  return (
    <section
      id="antes-despues"
      className="bg-[#F6F3EE] pt-20 pb-20 md:pt-28 md:pb-40"
    >
      {/* ── Section header ──────────────────────────────────────── */}
      <motion.div
        className="mb-10 max-w-[560px] px-[6%] md:mb-14 md:px-[8%]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p
          className="mb-5 font-sans text-[#B08B64] md:mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.5em" }}
        >
          ANTES Y DESPUÉS
        </p>
        <h2
          className="font-display mb-4 leading-[1.06] font-light tracking-[-0.025em] text-[#202020]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.2rem)" }}
        >
          Cuando el diseño transforma un espacio.
        </h2>
        <p
          className="font-sans text-[#6B665F]"
          style={{
            fontSize: "14px",
            lineHeight: "1.78",
            letterSpacing: "0.01em",
            maxWidth: "340px",
          }}
        >
          Descubre algunos de los cambios que mejor reflejan nuestra forma de
          trabajar.
        </p>
      </motion.div>

      {/* ── Slider ──────────────────────────────────────────────── */}
      <motion.div
        className="px-[6%] md:px-[8%]"
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      >
        <div className="w-full md:mx-auto md:w-[78%]">
          {/* Fixed-aspect wrapper so AnimatePresence doesn't collapse the height */}
          <div className="relative" style={{ aspectRatio: "16 / 10" }}>
            <AnimatePresence>
              <motion.div
                key={current}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: EASE },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.99,
                  transition: { duration: 0.35, ease: EASE },
                }}
              >
                <BeforeAfterSlider transformation={TRANSFORMATIONS[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ── Project info + navigation ────────────────────────────── */}
      <div className="px-[6%] md:px-[8%]">
        <div className="mt-8 w-full md:mx-auto md:mt-10 md:w-[78%]">
          {/* Project name + type — crossfades on change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: EASE },
              }}
              exit={{
                opacity: 0,
                y: -6,
                transition: { duration: 0.25, ease: EASE },
              }}
            >
              <h3
                className="font-display mb-1.5 font-light tracking-[-0.02em] text-[#202020]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
              >
                {TRANSFORMATIONS[current].projectName}
              </h3>
              <p
                className="font-sans text-[#9B9389]"
                style={{ fontSize: "11px", letterSpacing: "0.06em" }}
              >
                {TRANSFORMATIONS[current].type}
                {" · "}
                {TRANSFORMATIONS[current].location}
                {" · "}
                {TRANSFORMATIONS[current].year}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center gap-8 md:mt-12">
            <button
              onClick={() => navigate(current - 1)}
              disabled={current === 0}
              className="flex items-center gap-2 font-sans text-[#202020] transition-all duration-300 hover:text-[#B08B64] disabled:opacity-20"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
              aria-label="Proyecto anterior"
            >
              <ChevronLeft size={13} strokeWidth={1.5} />
              ANTERIOR
            </button>

            <span
              className="font-sans text-[#9B9389] tabular-nums"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>

            <button
              onClick={() => navigate(current + 1)}
              disabled={current === total - 1}
              className="flex items-center gap-2 font-sans text-[#202020] transition-all duration-300 hover:text-[#B08B64] disabled:opacity-20"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
              aria-label="Proyecto siguiente"
            >
              SIGUIENTE
              <ChevronRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
