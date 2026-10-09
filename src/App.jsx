import { useState, useEffect, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ChurchLogo from './components/ChurchLogo/ChurchLogo';
import ImageHero from './sections/ImageHero/ImageHero';
import WhoWeAre from './sections/WhoWeAre/WhoWeAre';
import Pastor from './sections/Pastor/Pastor';
import Visit from './sections/Visit/Visit';
import Give from './sections/Give/Give';
import Footer from './sections/Footer/Footer';
import UImpactButton from './components/UImpactButton/UImpactButton';
import UImpactApp from './features/u-impact/App';
import ConstructionPreview from './features/u-impact/pages/ConstructionPreview';
import './App.css';
import { getRoute, normalizeLegacyRoute } from './routing';
import { updateSeo } from './seo';

/**
 * App — Main application shell for Unity Christian Church.
 * 
 * Supports integrated routes:
 *   /u-impact/ → Complete integrated U Impact experience (legacy hashes supported)
 *   #/dev/construction-preview → Cinematic construction experience dev route
 *   (default / #/) → Unity Christian Church homepage
 */
export default function App({ initialRoute = '/' }) {
  useSmoothScroll();
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hash & pathname routing sync
  useEffect(() => {
    const handleLocationChange = () => {
      normalizeLegacyRoute();
      setCurrentRoute(getRoute(window.location));
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => { updateSeo(currentRoute); }, [currentRoute]);

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

  // Smooth transition to U-Impact
  const handleUImpactNavigate = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsTransitioning(true);

    setTimeout(() => {
      window.history.pushState(null, '', '/u-impact/');
      setCurrentRoute('/u-impact/');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 200);
  }, []);

  // Return to Church homepage
  const handleReturnToChurch = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.history.pushState(null, '', '/');
      setCurrentRoute('/');
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 200);
  }, []);

  const isUImpactRoute =
    currentRoute === '#/u-impact' ||
    currentRoute === '#u-impact' ||
    currentRoute === '/u-impact/';

  // Dev route: Construction Preview
  if (currentRoute === '#/dev/construction-preview') {
    return <ConstructionPreview />;
  }

  // Integrated U Impact Experience
  if (isUImpactRoute) {
    return (
      <>
        {/* Transition Curtain Overlay */}
        <div className={`route-transition-overlay ${isTransitioning ? 'route-transition-overlay--active' : ''}`} />
        <UImpactApp onReturnToChurch={handleReturnToChurch} />
      </>
    );
  }

  return (
    <div className="app">
      {/* Route Transition Curtain Overlay */}
      <div className={`route-transition-overlay ${isTransitioning ? 'route-transition-overlay--active' : ''}`} />

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

          {/* U IMPACT Button with YouTube Subscribe pill aesthetics and iridescent outline animation */}
          <UImpactButton
            onClick={handleUImpactNavigate}
            isScrolled={isNavScrolled}
            isMobile={false}
          />

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
