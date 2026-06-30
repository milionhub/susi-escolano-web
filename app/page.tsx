import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PLACEHOLDER_SECTIONS } from "@/lib/constants";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />

      {/* Placeholder sections — Fases 3 y 4 */}
      {PLACEHOLDER_SECTIONS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`min-h-screen flex flex-col items-center justify-center gap-3 ${s.bg}`}
        >
          <p
            className={`font-display text-4xl font-light tracking-[0.2em] ${s.text} opacity-20`}
          >
            {s.label}
          </p>
          <p
            className={`font-sans text-xs tracking-[0.3em] uppercase ${s.text} opacity-10`}
          >
            Próximamente
          </p>
        </section>
      ))}
    </main>
  );
}
