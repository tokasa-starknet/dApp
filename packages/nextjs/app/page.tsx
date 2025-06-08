'use client';  // ① convierte todo en Client Component

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Header from '~~/components/landing/Header';
import HeroSection from '~~/components/landing/HeroSection';
import DualTokenEcosystem from '~~/components/landing/DualTokenEcosystem';
import TokenEcosystem from '~~/components/landing/TokenEcosystem';
import WhatIsToKasa from '~~/components/landing/WhatIsToKasa';
import BenefitsSection from '~~/components/landing/BenefitsSection';
import HowItWorks from '~~/components/landing/HowItWorks';
import WhyChooseUs from '~~/components/landing/WhyChooseUs';
import Roadmap from '~~/components/landing/Roadmap';
import JoinCommunity from '~~/components/landing/JoinCommunity';
import FAQ from '~~/components/landing/FAQ';
import Footer from '~~/components/landing/Footer';
import ProblemSolutionSection from '~~/components/landing/ProblemSolution'; 




export default function LandingPage() {
  const pathname = usePathname(); // ② hook para detectar ruta

  useEffect(() => {
    // Desactiva el scrollRestoration nativo
    if ('scrollRestoration' in history) {
      window.history.scrollRestoration = 'manual';
    }
    // Al montar, ir al tope
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Cada vez que cambie la ruta, vuelve al tope
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />

      <main className="overflow-y-auto">
        <HeroSection />
        <ProblemSolutionSection />
        <WhatIsToKasa />
        <BenefitsSection />
        <DualTokenEcosystem />
        <HowItWorks />
        <WhyChooseUs />
        <Roadmap />
        <TokenEcosystem />
        <JoinCommunity />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
