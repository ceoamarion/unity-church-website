import { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Hero from './sections/Hero/Hero';
import InteriorShowcase from './sections/InteriorShowcase/InteriorShowcase';
import Pastor from './sections/Pastor/Pastor';
import Visit from './sections/Visit/Visit';
import Give from './sections/Give/Give';
import Footer from './sections/Footer/Footer';
import './App.css';

/**
 * App — Main application shell.
 * 
 * Flow:
 * 1. Hero: Pinned scroll-driven video construction film (8 synced scenes)
 * 2. InteriorShowcase: Explore the Campus
 * 3. Pastor: Our Leadership & Bio
 * 4. Visit: Service times & guest registration
 * 5. Give: Generosity & Building Fund
 * 6. Footer: Address & footer CTA
 */
export default function App() {
  const { lenisRef } = useSmoothScroll();
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  // Track scroll position for nav background overlay
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Dynamic Navigation Bar */}
      <nav className={`nav ${isNavScrolled ? 'nav--scrolled' : ''}`}>
        <a href="#hero" className="nav__logo">Unity Church</a>
        <div className="nav__links">
          <a href="#hero" className="nav__link">Construction</a>
          <a href="#spaces" className="nav__link">Spaces</a>
          <a href="#pastor" className="nav__link">Leadership</a>
          <a href="#visit" className="nav__link">Visit</a>
          <a href="#give" className="nav__link">Give</a>
          <a href="#visit" className="btn btn--primary nav__cta">Plan Your Visit</a>
        </div>
      </nav>

      {/* Page Sections */}
      <main>
        {/* Pinned Scroll-Driven Video Film */}
        <Hero />

        {/* Post-Construction Sections */}
        <InteriorShowcase />
        <Pastor />
        <Visit />
        <Give />
        <Footer />
      </main>
    </div>
  );
}
