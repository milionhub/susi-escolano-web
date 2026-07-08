"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

export interface Transformation {
  id: string;
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "project-01",
    title: "Terraza en Elche",
    before: {
      src: "/images/before-after/project-01/before.jfif",
      alt: "Antes — Terraza en Elche",
    },
    after: {
      src: "/images/before-after/project-01/after.jfif",
      alt: "Después — Terraza en Elche",
    },
  },
  {
    id: "project-02",
    title: "Cocina en Arenales del Sol",
    before: {
      src: "/images/before-after/project-02/before.jfif",
      alt: "Antes — Cocina en Arenales del Sol",
    },
    after: {
      src: "/images/before-after/project-02/after.jfif",
      alt: "Después — Cocina en Arenales del Sol",
    },
  },
  {
    id: "project-03",
    title: "Salón en Alicante",
    before: {
      src: "/images/before-after/project-03/before.jfif",
      alt: "Antes — Salón en Alicante",
    },
    after: {
      src: "/images/before-after/project-03/after.jfif",
      alt: "Después — Salón en Alicante",
    },
  },
  {
    id: "project-04",
    title: "Baño en Montesol",
    before: {
      src: "/images/before-after/project-04/before.jfif",
      alt: "Antes — Baño en Montesol",
    },
    after: {
      src: "/images/before-after/project-04/after.jfif",
      alt: "Después — Baño en Montesol",
    },
  },
  {
    id: "project-05",
    title: "Cocina en Torrevieja",
    before: {
      src: "/images/before-after/project-05/before.jfif",
      alt: "Antes — Cocina en Torrevieja",
    },
    after: {
      src: "/images/before-after/project-05/after.jfif",
      alt: "Después — Cocina en Torrevieja",
    },
  },
  {
    id: "project-06",
    title: "Salón y cocina en Elche",
    before: {
      src: "/images/before-after/project-06/before.jfif",
      alt: "Antes — Salón y cocina en Elche",
    },
    after: {
      src: "/images/before-after/project-06/after.jfif",
      alt: "Después — Salón y cocina en Elche",
    },
  },
  {
    id: "project-07",
    title: "Baño en Santa Pola",
    before: {
      src: "/images/before-after/project-07/before.jfif",
      alt: "Antes — Baño en Santa Pola",
    },
    after: {
      src: "/images/before-after/project-07/after.jfif",
      alt: "Después — Baño en Santa Pola",
    },
  },
  {
    id: "project-08",
    title: "Salón y cocina en Santa Pola",
    before: {
      src: "/images/before-after/project-08/before.jfif",
      alt: "Antes — Salón y cocina en Santa Pola",
    },
    after: {
      src: "/images/before-after/project-08/after.jfif",
      alt: "Después — Salón y cocina en Santa Pola",
    },
  },
  {
    id: "project-09",
    title: "Cocina en Piles",
    before: {
      src: "/images/before-after/project-09/before.jfif",
      alt: "Antes — Cocina en Piles",
    },
    after: {
      src: "/images/before-after/project-09/after.jfif",
      alt: "Después — Cocina en Piles",
    },
  },
];

// ── Shared ease ───────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Scroll entrance (staggered, one block after another) ─────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// ── Before / After slider ─────────────────────────────────────────────────────

interface SliderProps {
  transformation: Transformation;
  priority?: boolean;
}

function BeforeAfterSlider({ transformation, priority = false }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [ariaValue, setAriaValue] = useState(50);

  // Raw position follows the pointer exactly; a light spring smooths it into
  // an elegant, judder-free glide without ever feeling laggy.
  const rawPosition = useMotionValue(50);
  const position = useSpring(rawPosition, {
    stiffness: 420,
    damping: 42,
    mass: 0.4,
  });

  const clipPath = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(position, (v) => `${v}%`);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    rawPosition.set(Math.max(1, Math.min(99, pct)));
  }, [rawPosition]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
      setAriaValue(Math.round(rawPosition.get()));
    },
    [updatePosition, rawPosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setAriaValue(Math.round(rawPosition.get()));
  }, [rawPosition]);

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
      aria-label={`Comparador antes y después — ${transformation.title}`}
      aria-valuenow={ariaValue}
      aria-valuemin={1}
      aria-valuemax={99}
    >
      {/* ── After (base layer — always full width) ────────────── */}
      <div className="absolute inset-0">
        {/* TEMP DEBUG: next/image swapped for <img> to isolate a prod-only rendering issue */}
        <img
          src={transformation.after.src}
          alt={transformation.after.alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/compare:scale-[1.01]"
        />
        <span
          className="pointer-events-none absolute right-5 bottom-4 z-10 font-sans text-white/70"
          style={{ fontSize: "8px", letterSpacing: "0.4em" }}
        >
          DESPUÉS
        </span>
      </div>

      {/* ── Before (clipped to the left of the handle) ───────── */}
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        {/* TEMP DEBUG: next/image swapped for <img> to isolate a prod-only rendering issue */}
        <img
          src={transformation.before.src}
          alt={transformation.before.alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/compare:scale-[1.01]"
        />
        <span
          className="pointer-events-none absolute bottom-4 left-5 z-10 font-sans text-white/70"
          style={{ fontSize: "8px", letterSpacing: "0.4em" }}
        >
          ANTES
        </span>
      </motion.div>

      {/* ── Divider + handle ─────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{ left: handleLeft, translateX: "-50%" }}
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
      </motion.div>
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
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* ── Section header ──────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="mb-10 max-w-[560px] px-[6%] md:mb-14 md:px-[8%]"
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

        {/* ── Slider + project info share a hover group ────────────── */}
        <div className="group/compare">
          <motion.div variants={itemVariants} className="px-[6%] md:px-[8%]">
            <div className="w-full md:mx-auto md:w-[78%]">
              {/* Fixed-aspect wrapper so AnimatePresence doesn't collapse the height */}
              <div
                className="relative transition-shadow duration-700 ease-out group-hover/compare:shadow-[0_35px_70px_-30px_rgba(32,32,32,0.28)]"
                style={{ aspectRatio: "16 / 10" }}
              >
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
                    <BeforeAfterSlider
                      transformation={TRANSFORMATIONS[current]}
                      priority={current === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ── Project info + navigation ────────────────────────────── */}
          <motion.div variants={itemVariants} className="px-[6%] md:px-[8%]">
            <div className="mt-8 w-full md:mx-auto md:mt-10 md:w-[78%]">
              {/* Title — crossfades on change */}
              <AnimatePresence mode="wait">
                <motion.h3
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
                  className="font-display font-light tracking-[-0.02em] text-[#202020] transition-colors duration-500 group-hover/compare:text-[#141414]"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                >
                  {TRANSFORMATIONS[current].title}
                </motion.h3>
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
