import { useState, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ChurchLogo from './components/ChurchLogo/ChurchLogo';
import ImageHero from './sections/ImageHero/ImageHero';
import WhoWeAre from './sections/WhoWeAre/WhoWeAre';
import Pastor from './sections/Pastor/Pastor';
import Visit from './sections/Visit/Visit';
import Give from './sections/Give/Give';
import Footer from './sections/Footer/Footer';
import ConstructionPreview from './features/u-impact/pages/ConstructionPreview';
import './App.css';

/**
 * App — Main application shell.
 * 
 * Supports hash-based routing for dev previews:
 *   #/dev/construction-preview → Cinematic construction experience
 *   (default) → Unity Christian Church homepage
 * 
 * Flow:
 * 1. ImageHero: Cinematic photo hero with the actual Unity Christian Church building
 * 2. WhoWeAre: "More Than A Sunday" introduction & mission statement
 * 3. Pastor: Our Leadership & Bio
 * 4. Visit: Service times & guest registration
 * 5. Give: Generosity & Building Fund
 * 6. Footer: Address & footer CTA
 *
 * NOTE: The building/space-exploration experience (InteriorShowcase,
 * Construction, Transition, cinematic engine, etc.) has been separated
 * into src/features/u-impact/ for future use in the U Impact website.
 * See src/features/u-impact/README.md for details.
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
        <a href="#hero" className="nav__logo">
          <ChurchLogo
            variant={isNavScrolled ? 'dark' : 'light'}
            height={38}
          />
        </a>

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

        {/* "More Than A Sunday" Introduction & Mission */}
        <WhoWeAre />

        {/* Church Sections */}
        <Pastor />
        <Visit />
        <Give />
        <Footer />
      </main>
    </div>
  );
}
