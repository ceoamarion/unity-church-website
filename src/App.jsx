import { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Hero from './sections/Hero/Hero';
import Construction from './sections/Construction/Construction';
import Transition from './sections/Transition/Transition';
import InteriorShowcase from './sections/InteriorShowcase/InteriorShowcase';
import Footer from './sections/Footer/Footer';
import './App.css';

/**
 * App — Main application shell.
 * Initializes smooth scrolling and composes all page sections.
 */
export default function App() {
  const { lenisRef } = useSmoothScroll();
  const [isNavScrolled, setIsNavScrolled] = useState(false);

  // Track scroll position for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`nav ${isNavScrolled ? 'nav--scrolled' : ''}`}>
        <a href="#hero" className="nav__logo">Unity Church</a>
        <div className="nav__links">
          <a href="#spaces" className="nav__link">Spaces</a>
          <a href="#footer" className="nav__link">Visit</a>
          <button className="btn btn--primary nav__cta">Plan Your Visit</button>
        </div>
      </nav>

      {/* Page Sections */}
      <main>
        <Hero />
        <Construction />
        <Transition />
        <InteriorShowcase />
        <Footer />
      </main>
    </div>
  );
}
