import React, { useState } from 'react';
import Navbar from './components/navigation/Navbar';
import ImpactIntro from './components/intro/ImpactIntro';
import PillarsSection from './components/sections/PillarsSection';
import StoriesSection from './components/sections/StoriesSection';
import ConstructionSection from './components/sections/ConstructionSection';
import UpcomingSection from './components/sections/UpcomingSection';
import GetInvolvedModal from './components/sections/GetInvolvedModal';
import Footer from './components/sections/Footer';
import { useLenis } from './hooks/useLenis';

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  const [isInvolvedModalOpen, setIsInvolvedModalOpen] = useState(false);

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

  const handleOpenInvolvedModal = () => {
    setIsInvolvedModalOpen(true);
  };

  const handleCloseInvolvedModal = () => {
    setIsInvolvedModalOpen(false);
  };

  return (
    <div className="u-impact-app">
      {/* Subtle Cinematic Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Floating Navigation */}
      <Navbar onGetInvolvedClick={handleOpenInvolvedModal} />

      {/* 1. Master Cinematic 3D Opening Experience ("One Impact Becomes Many") */}
      <main>
        <ImpactIntro 
          onExploreClick={handleExploreClick}
          onGetInvolvedClick={handleOpenInvolvedModal}
        />

        {/* 2. Our Pillars & Initiatives Showcase */}
        <PillarsSection onGetInvolvedClick={handleOpenInvolvedModal} />

        {/* 3. Stories of Impact (Real Human Transformation) */}
        <StoriesSection />

        {/* 4. Physical Spaces (Preserved Construction System Integration) */}
        <ConstructionSection />

        {/* 5. Upcoming Activations & Community Opportunities */}
        <UpcomingSection onGetInvolvedClick={handleOpenInvolvedModal} />
      </main>

      {/* Platform Footer */}
      <Footer onGetInvolvedClick={handleOpenInvolvedModal} />

      {/* Interactive Get Involved / Pledge Modal */}
      <GetInvolvedModal 
        isOpen={isInvolvedModalOpen}
        onClose={handleCloseInvolvedModal}
      />
    </div>
  );
}
