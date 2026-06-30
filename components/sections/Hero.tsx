"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ROOMS, HOUSE_RENDER } from "@/lib/constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  const imageX = useTransform(springX, [0, 1], [22, -22]);
  const imageY = useTransform(springY, [0, 1], [10, -10]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-screen w-full overflow-hidden bg-[#18150f]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen con efecto parallax de ratón */}
      <motion.div
        style={{ x: imageX, y: imageY, scale: 1.08 }}
        className="absolute inset-0"
      >
        <Image
          src={HOUSE_RENDER.src}
          alt={HOUSE_RENDER.alt}
          fill
          className="object-cover object-[30%_center] md:object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Viñeta cinematográfica */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 82% at 50% 42%, transparent, rgba(10,9,7,0.52))",
        }}
      />

      {/* Hotspots — puntos discretos, etiqueta al hover */}
      <div className="absolute inset-0 z-10">
        {ROOMS.map((r) => (
          <button
            key={r.id}
            style={{ left: `${r.hotspot.x}%`, top: `${r.hotspot.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
            aria-label={r.label}
          >
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-500 group-hover:scale-150"
              style={{
                backgroundColor: "rgba(255,255,255,0.28)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
              }}
            />
            <span className="flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span
                className="block h-px w-3"
                style={{ backgroundColor: "rgba(197,168,128,0.55)" }}
              />
              <span className="whitespace-nowrap font-sans text-[8px] uppercase tracking-[0.48em] text-[#c5a880]">
                {r.label}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Texto de descubrimiento */}
      <p
        className="absolute bottom-28 left-8 z-20 hidden font-sans text-[9px] uppercase tracking-[0.52em] md:block"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Explora cada rincón de tu futuro hogar
      </p>

      {/* Degradado inferior — conecta con la sección Servicios */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f5f3ef] to-transparent" />

      {/* Indicador de scroll */}
      <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.12, 0.4, 0.12] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px origin-top"
          style={{ backgroundColor: "rgba(28,28,26,0.4)" }}
        />
      </div>
    </section>
  );
}
