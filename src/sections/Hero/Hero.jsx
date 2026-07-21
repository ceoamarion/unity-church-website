import { useEffect, useRef, useState } from 'react';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import './Hero.css';

/**
 * Hero — Full-viewport opening shot with empty land, sky, and church title.
 * Parallax sky background with oversized typography and subtle scroll indicator.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;
  const titleOpacity = Math.max(0, 1 - scrollY / 600);
  const titleTransform = scrollY * 0.2;

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Parallax Sky Background */}
      <div
        className="hero__sky"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />

      {/* Sun Glow */}
      <div
        className="hero__sun"
        style={{
          transform: `translate(-50%, ${-20 + parallaxOffset * 0.3}px) scale(${1 + scrollY * 0.001})`,
          opacity: Math.max(0.3, 0.7 - scrollY * 0.001),
        }}
      />

      {/* Ground / Landscape */}
      <div className="hero__ground" />

      {/* Content Overlay */}
      <div
        className="hero__content"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTransform}px)`,
        }}
      >
        <span className="hero__label text-label">Est. 2026</span>
        <h1 className="hero__title text-hero">
          Unity<br />Church
        </h1>
        <p className="hero__subtitle text-accent">
          "Where faith builds community"
        </p>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="hero__fade" />

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
