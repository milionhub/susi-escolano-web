import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyTrustUs } from "@/components/sections/WhyTrustUs";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Projects />
      <Process />
      <BeforeAfter />
      <WhyTrustUs />
      <Contact />
      <Footer />
    </main>
  );
}
