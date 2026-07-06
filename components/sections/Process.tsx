"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    verb: "Escuchamos",
    description:
      "Cada proyecto empieza entendiendo cómo quieres vivir y qué esperas realmente de tu hogar.",
  },
  {
    number: "02",
    verb: "Diseñamos",
    description:
      "Convertimos las ideas en una propuesta funcional, estética y personalizada.",
  },
  {
    number: "03",
    verb: "Planificamos",
    description:
      "Coordinamos materiales, plazos y cada fase para que todo avance con orden.",
  },
  {
    number: "04",
    verb: "Construimos",
    description:
      "Ejecutamos la obra cuidando los detalles y manteniendo una comunicación constante.",
  },
  {
    number: "05",
    verb: "Entregamos",
    description:
      "Solo damos un proyecto por terminado cuando el resultado está a la altura de lo esperado.",
  },
] as const;

// 7 phases: intro (0) + steps 01–05 (1–5) + coda (6)
const PH = 1 / 7;

// ── Intro block ───────────────────────────────────────────────────────────────

function IntroContent({ progress }: { progress: MotionValue<number> }) {
  // FM v12 bug: function form prevents ghost at opacity ~0.4 when inputRange[0] === 0
  const opacity = useTransform(progress, (v) =>
    v >= PH ? 0 : v <= PH * 0.58 ? 1 : 1 - (v - PH * 0.58) / (PH * 0.42),
  );
  const y = useTransform(progress, [PH * 0.55, PH], [0, -45]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-[6%] md:px-[8%]"
      style={{ opacity, y, willChange: "transform, opacity" }}
    >
      <p
        className="mb-5 font-sans text-[#B08B64] md:mb-6"
        style={{ fontSize: "9px", letterSpacing: "0.5em" }}
      >
        NUESTRO PROCESO
      </p>

      <div className="mb-4 overflow-hidden md:mb-5">
        <motion.h2
          className="font-display max-w-[680px] leading-[1.06] font-light tracking-[-0.025em] text-[#202020]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
        >
          Cada gran proyecto comienza mucho antes de la obra.
        </motion.h2>
      </div>

      <p
        className="mb-8 max-w-[340px] font-sans text-[#6B665F] md:mb-10"
        style={{
          fontSize: "13px",
          lineHeight: "1.7",
          letterSpacing: "0.015em",
        }}
      >
        Cinco pasos. Un resultado.
      </p>

      <motion.div
        className="flex items-center gap-3.5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-8 w-px bg-[#B08B64]/40" />
        <span
          className="font-sans text-[#9B9389]"
          style={{ fontSize: "8.5px", letterSpacing: "0.32em" }}
        >
          DESPLÁZATE
        </span>
      </motion.div>
    </motion.div>
  );
}

// ── Step block ────────────────────────────────────────────────────────────────

interface StepContentProps {
  progress: MotionValue<number>;
  step: (typeof STEPS)[number];
  index: number;
}

function StepContent({ progress, step, index }: StepContentProps) {
  const phaseStart = (index + 1) * PH;
  const phaseEnd = (index + 2) * PH;
  // Last step must be fully gone before the coda appears — zero overlap
  const isLast = index === STEPS.length - 1;

  const enterEnd = phaseStart + PH * 0.24;
  const textEnterEnd = phaseStart + PH * 0.38;
  const exitStart = isLast ? phaseEnd - PH * 0.42 : phaseEnd - PH * 0.22;
  const exitEnd = isLast ? phaseEnd : phaseEnd + PH * 0.05;

  const opacity = useTransform(
    progress,
    [phaseStart, phaseStart + PH * 0.04, exitStart, exitEnd],
    [0, 1, 1, 0],
  );
  const exitY = useTransform(progress, [exitStart, exitEnd], [0, -40]);
  // Function form — avoids FM v12 string-interpolation clamping issues
  const exitBlur = useTransform(progress, (v) => {
    if (v <= exitStart) return "blur(0px)";
    if (v >= exitEnd) return "blur(10px)";
    return `blur(${((v - exitStart) / (exitEnd - exitStart)) * 10}px)`;
  });
  const verbY = useTransform(progress, [phaseStart, enterEnd], ["102%", "0%"]);
  const numOpacity = useTransform(progress, [phaseStart, textEnterEnd], [0, 1]);
  const numY = useTransform(progress, [phaseStart, textEnterEnd], [18, 0]);
  const descOpacity = useTransform(
    progress,
    [phaseStart + PH * 0.14, textEnterEnd],
    [0, 1],
  );
  const descY = useTransform(
    progress,
    [phaseStart + PH * 0.14, textEnterEnd],
    [14, 0],
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-[6%] md:px-[8%]"
      style={{
        opacity,
        y: exitY,
        filter: exitBlur,
        willChange: "transform, opacity, filter",
      }}
    >
      <motion.p
        className="mb-5 font-sans text-[#B08B64] md:mb-6"
        style={{
          fontSize: "9px",
          letterSpacing: "0.45em",
          opacity: numOpacity,
          y: numY,
        }}
      >
        {step.number}
      </motion.p>

      <div className="mb-4 overflow-hidden md:mb-5">
        <motion.h2
          className="font-display leading-[0.94] font-light tracking-[-0.04em] text-[#202020]"
          style={{ fontSize: "clamp(4rem, 11.5vw, 12rem)", y: verbY }}
        >
          {step.verb}
        </motion.h2>
      </div>

      <motion.p
        className="max-w-[400px] font-sans text-[#6B665F]"
        style={{
          fontSize: "14px",
          lineHeight: "1.78",
          letterSpacing: "0.01em",
          opacity: descOpacity,
          y: descY,
        }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

// ── Coda block ────────────────────────────────────────────────────────────────

function CodaContent({ progress }: { progress: MotionValue<number> }) {
  const codaStart = 6 * PH;
  const fadeDuration = PH * 0.38;

  // Function form — same FM v12 safety as IntroContent
  const opacity = useTransform(progress, (v) => {
    if (v < codaStart) return 0;
    if (v < codaStart + fadeDuration) return (v - codaStart) / fadeDuration;
    return 1;
  });
  const y = useTransform(
    progress,
    [codaStart, codaStart + fadeDuration],
    [28, 0],
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-[8%] text-center"
      style={{ opacity, y, willChange: "transform, opacity" }}
    >
      <div className="mb-8 h-px w-8 bg-[#B08B64]/50 md:mb-10" />
      <h2
        className="font-display mb-4 max-w-[640px] leading-[1.1] font-light tracking-[-0.025em] text-[#202020] md:mb-5"
        style={{ fontSize: "clamp(2.2rem, 5vw, 4.8rem)" }}
      >
        El diseño empieza mucho antes de la obra.
      </h2>
      <p
        className="max-w-[340px] font-sans text-[#6B665F]"
        style={{
          fontSize: "13px",
          lineHeight: "1.78",
          letterSpacing: "0.015em",
        }}
      >
        Un buen resultado nace de un proceso bien pensado.
      </p>
    </motion.div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({
  progress,
  activeStep,
}: {
  progress: MotionValue<number>;
  activeStep: number;
}) {
  // Bar fills to 100% by the start of the coda phase
  const scaleX = useTransform(progress, [PH, 6 * PH], [0, 1]);

  return (
    <div>
      <div className="mb-3 flex items-center gap-6 md:gap-8">
        {STEPS.map((step, i) => (
          <span
            key={step.number}
            className="font-sans tabular-nums transition-colors duration-400"
            style={{
              fontSize: "8.5px",
              letterSpacing: "0.22em",
              color:
                i === activeStep
                  ? "#B08B64"
                  : i < activeStep
                    ? "rgba(32,32,32,0.38)"
                    : "rgba(32,32,32,0.15)",
            }}
          >
            {step.number}
          </span>
        ))}
      </div>

      <div className="relative h-px w-full overflow-hidden bg-[#202020]/10">
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-[#B08B64]"
          style={{ scaleX, transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Fades in during intro, holds through all steps, fades out entering coda
  const indicatorOpacity = useTransform(scrollYProgress, (v) => {
    if (v < PH * 0.65) return 0;
    if (v < PH) return (v - PH * 0.65) / (PH * 0.35);
    const fadeOutStart = 6 * PH;
    const fadeOutEnd = 6 * PH + PH * 0.38;
    if (v < fadeOutStart) return 1;
    if (v < fadeOutEnd)
      return 1 - (v - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    return 0;
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < PH) setActiveStep(-1);
    else setActiveStep(Math.min(Math.floor((v - PH) / PH), STEPS.length - 1));
  });

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative h-[380vh] bg-[#EFE8DF] md:h-[440vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#EFE8DF]">
        {/* Indicator */}
        <motion.div
          className="absolute top-[92px] right-[6%] left-[6%] z-10 md:top-[100px] md:right-[8%] md:left-[8%]"
          style={{ opacity: indicatorOpacity }}
        >
          <StepIndicator progress={scrollYProgress} activeStep={activeStep} />
        </motion.div>

        {/* Content blocks */}
        <div className="relative h-full">
          <IntroContent progress={scrollYProgress} />
          {STEPS.map((step, i) => (
            <StepContent
              key={step.number}
              progress={scrollYProgress}
              step={step}
              index={i}
            />
          ))}
          <CodaContent progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
