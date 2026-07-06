"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Data ──────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    title: "ATENCIÓN AL DETALLE",
    description:
      "Cada decisión importa, desde la distribución hasta el último acabado.",
  },
  {
    title: "CUMPLIMIENTO DE PLAZOS",
    description:
      "Planificamos cada fase para reducir imprevistos y cumplir los tiempos acordados.",
  },
  {
    title: "COMUNICACIÓN CERCANA",
    description: "Siempre sabrás en qué punto se encuentra tu proyecto.",
  },
] as const;

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

// ── Metric value variants ─────────────────────────────────────────────────────

const metricValueClass =
  "font-display font-light leading-none tracking-[-0.02em] text-[#202020]";
const metricValueStyle = { fontSize: "clamp(3rem, 6vw, 4.6rem)" };

function CounterValue({ active }: { active: boolean }) {
  const value = useCountUp(100, active, 1300);
  return (
    <p className={`${metricValueClass} tabular-nums`} style={metricValueStyle}>
      +{value}
    </p>
  );
}

function YearRevealValue({ active }: { active: boolean }) {
  return (
    <p className={`${metricValueClass} flex items-baseline`} style={metricValueStyle}>
      <span className="overflow-hidden inline-block">
        <motion.span
          className="inline-block"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={active ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
        >
          Desde&nbsp;
        </motion.span>
      </span>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        2009
      </motion.span>
    </p>
  );
}

function RotateValue({ active }: { active: boolean }) {
  return (
    <motion.p
      className={`${metricValueClass} inline-block`}
      style={metricValueStyle}
      initial={{ rotate: 0, opacity: 0 }}
      animate={active ? { rotate: 360, opacity: 1 } : {}}
      transition={{
        rotate: { duration: 1.4, ease: EASE },
        opacity: { duration: 0.4, ease: EASE },
      }}
    >
      360°
    </motion.p>
  );
}

// ── Metric column ─────────────────────────────────────────────────────────────

function MetricColumn({
  index,
  caption,
  children,
}: {
  index: number;
  caption: string;
  children: (active: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const delay = 0.3 + index * 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        className="h-px bg-[#B08B64] origin-left mb-7 md:mb-9"
        style={{ width: "32px" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 0.1 }}
      />
      <div className="mb-3 md:mb-4">{children(isInView)}</div>
      <p
        className="font-sans text-[#6B665F]"
        style={{ fontSize: "12px", letterSpacing: "0.06em" }}
      >
        {caption}
      </p>
    </motion.div>
  );
}

// ── Value column ──────────────────────────────────────────────────────────────

function ValueColumn({
  value,
  index,
}: {
  value: (typeof VALUES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.9 + index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="md:px-10 lg:px-12 first:md:pl-0 last:md:pr-0"
    >
      <motion.div
        className="h-px bg-[#B08B64] origin-left mb-6 md:mb-7"
        animate={{ scaleX: hovered ? 1.3 : 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{ width: "32px" }}
      />

      <motion.p
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-sans text-[#202020] mb-3 md:mb-4"
        style={{ fontSize: "10px", letterSpacing: "0.22em" }}
      >
        {value.title}
      </motion.p>

      <motion.p
        animate={{ opacity: hovered ? 1 : 0.72 }}
        transition={{ duration: 0.4 }}
        className="font-sans text-[#6B665F] max-w-[280px]"
        style={{ fontSize: "12.5px", lineHeight: "1.7" }}
      >
        {value.description}
      </motion.p>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function WhyTrustUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="por-que-confiar"
      ref={sectionRef}
      className="bg-[#EFE8DF] px-[6%] md:px-[8%] pt-20 pb-20 md:pt-28 md:pb-36"
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="max-w-[680px] mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
          className="font-sans text-[#B08B64] mb-5 md:mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.5em" }}
        >
          POR QUÉ CONFIAR EN NOSOTROS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.14 }}
          className="font-display font-light text-[#202020] leading-[1.1] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2.3rem, 5vw, 4.4rem)" }}
        >
          La confianza se gana proyecto a proyecto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.26 }}
          className="font-sans text-[#6B665F] max-w-[480px]"
          style={{ fontSize: "13.5px", lineHeight: "1.78", letterSpacing: "0.01em" }}
        >
          Desde 2009 acompañamos a nuestros clientes con una forma de trabajar
          basada en la planificación, la cercanía y el cuidado por cada
          detalle.
        </motion.p>
      </div>

      {/* ── Metrics — pure typography, no cards ───────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr_1fr] gap-y-14 gap-x-10 mb-20 md:mb-28">
        <MetricColumn index={0} caption="Proyectos realizados">
          {(active) => <CounterValue active={active} />}
        </MetricColumn>
        <MetricColumn index={1} caption="Experiencia">
          {(active) => <YearRevealValue active={active} />}
        </MetricColumn>
        <MetricColumn index={2} caption="Gestión integral">
          {(active) => <RotateValue active={active} />}
        </MetricColumn>
      </div>

      {/* ── Values — no boxes, hairline vertical divider only ─────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#CEC9C2] gap-y-10">
        {VALUES.map((value, i) => (
          <ValueColumn key={value.title} value={value} index={i} />
        ))}
      </div>
    </section>
  );
}
