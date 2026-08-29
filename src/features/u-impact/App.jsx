import React, { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import ImpactIntro from './components/intro/ImpactIntro';
import PillarsSection from './components/sections/PillarsSection';
import StoriesSection from './components/sections/StoriesSection';
import ConstructionSection from './components/sections/ConstructionSection';
import UpcomingSection from './components/sections/UpcomingSection';
import GetInvolvedModal from './components/sections/GetInvolvedModal';
import Footer from './components/sections/Footer';
import { useLenis } from './hooks/useLenis';
import './styles/index.css';
import './styles/tokens.css';

export default function UImpactApp({ onReturnToChurch }) {
  // Initialize Lenis smooth scroll
  useLenis();

  // Scroll to top and set body class for dark theme scoping
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('u-impact-active');
    return () => {
      document.body.classList.remove('u-impact-active');
    };
  }, []);

  const handleExploreClick = () => {
    const pillarsEl = document.getElementById('pillars');
    if (pillarsEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(pillarsEl, { duration: 1.2 });
      } else {
        pillarsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="u-impact-app">
      {/* Subtle Cinematic Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Floating Navigation */}
      <Navbar onReturnToChurch={onReturnToChurch} />

      {/* 1. Master Cinematic 3D Opening Experience ("One Impact Becomes Many") */}
      <main>
        <ImpactIntro onExploreClick={handleExploreClick} />

        {/* 2. Our Pillars & Initiatives Showcase */}
        <PillarsSection />

        {/* 3. Stories of Impact (Real Human Transformation) */}
        <StoriesSection />

        {/* 4. Physical Spaces (Preserved Construction System Integration) */}
        <ConstructionSection />

        {/* 5. Upcoming Activations & Community Opportunities */}
        <UpcomingSection />
      </main>

      {/* Platform Footer */}
      <Footer />
    </div>
  );
}
