"use client";

import { motion } from "framer-motion";
import { Hammer, ChefHat, Droplets, Palette } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import type { ServiceIconName } from "@/lib/constants";

const ICON_MAP = { Hammer, ChefHat, Droplets, Palette } as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function Services() {
  return (
    <section id="servicios" className="bg-[#f5f3ef] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 block font-sans text-[10px] uppercase tracking-[0.5em] text-[#c5a880]">
            Nuestros servicios
          </span>
          <h2 className="font-display text-5xl font-light text-[#1c1c1a] md:text-6xl xl:text-7xl">
            Servicios
          </h2>
          <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#1c1c1a]/50">
            Reformas integrales e interiorismo en Elche, Alicante y Santa Pola.
            Calidad premium, resultados que enamoran.
          </p>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon as ServiceIconName];
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative flex flex-col gap-7 border border-[#e8e4dc] bg-white p-8 shadow-sm xl:p-10"
              >
                <Icon size={20} className="text-[#c5a880]" strokeWidth={1.5} />
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-[1.35rem] font-light leading-snug text-[#1c1c1a]">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-[#1c1c1a]/50">
                    {service.description}
                  </p>
                </div>
                {/* Línea dorada al hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#c5a880] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
