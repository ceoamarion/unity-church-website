import { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ImageHero from './sections/ImageHero/ImageHero';
import WhoWeAre from './sections/WhoWeAre/WhoWeAre';
import InteriorShowcase from './sections/InteriorShowcase/InteriorShowcase';
import Pastor from './sections/Pastor/Pastor';
import Visit from './sections/Visit/Visit';
import Give from './sections/Give/Give';
import Footer from './sections/Footer/Footer';
import ConstructionPreview from './pages/ConstructionPreview';
import './App.css';

/**
 * App — Main application shell.
 * 
 * Supports hash-based routing for dev previews:
 *   #/dev/construction-preview → Cinematic construction experience
 *   (default) → Unity Church homepage
 * 
 * Flow:
 * 1. ImageHero: Cinematic photo hero with the actual Unity Church building
 * 2. WhoWeAre: "More Than A Sunday" introduction
 * 3. InteriorShowcase: Explore the Campus
 * 4. Pastor: Our Leadership & Bio
 * 5. Visit: Service times & guest registration
 * 6. Give: Generosity & Building Fund
 * 7. Footer: Address & footer CTA
 */
export default function App() {
  const { lenisRef } = useSmoothScroll();
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  // Hash-based routing for dev previews
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track scroll position for nav background overlay
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Dev route: Construction Preview
  if (currentRoute === '#/dev/construction-preview') {
    return <ConstructionPreview />;
  }

  return (
    <div className="app">
      {/* Dynamic Navigation Bar */}
      <nav className={`nav ${isNavScrolled ? 'nav--scrolled' : ''}`}>
        <a href="#hero" className="nav__logo">Unity Church</a>

        {/* Mobile hamburger */}
        <button
          className={`nav__hamburger ${isMobileMenuOpen ? 'nav__hamburger--active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
        </button>

        <div className={`nav__links ${isMobileMenuOpen ? 'nav__links--open' : ''}`}>
          <a href="#about" className="nav__link" onClick={handleNavClick}>About</a>
          <a href="#spaces" className="nav__link" onClick={handleNavClick}>Spaces</a>
          <a href="#pastor" className="nav__link" onClick={handleNavClick}>Leadership</a>
          <a href="#visit" className="nav__link" onClick={handleNavClick}>Visit</a>
          <a href="#give" className="nav__link" onClick={handleNavClick}>Give</a>
          <a href="#visit" className="btn btn--primary nav__cta" onClick={handleNavClick}>Plan Your Visit</a>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="nav__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Page Sections */}
      <main>
        {/* Cinematic Photo Hero */}
        <ImageHero />

        {/* "More Than A Sunday" Introduction */}
        <WhoWeAre />

        {/* Post-Hero Sections */}
        <InteriorShowcase />
        <Pastor />
        <Visit />
        <Give />
        <Footer />
      </main>
    </div>
  );
}
