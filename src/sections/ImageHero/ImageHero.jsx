import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageHero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImageHero — Apple-inspired cinematic photo hero.
 *
 * Uses the actual Unity Church exterior photograph as the visual centerpiece.
 * GSAP ScrollTrigger drives subtle parallax, scale, and darkening effects
 * to create a premium, alive-feeling hero without excessive motion.
 *
 * Performance:
 * - GPU-composited transforms & opacity only
 * - will-change on animated elements
 * - prefers-reduced-motion respected
 * - GSAP context cleanup on unmount
 */
export default function ImageHero() {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const hero = heroRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    if (!hero || !media || !content || !overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Image: slow scale up + subtle upward shift (parallax)
      tl.to(
        media,
        {
          scale: 1.08,
          y: '-6%',
          ease: 'none',
        },
        0
      );

      // Overlay: darken as user scrolls away
      tl.to(
        overlay,
        {
          opacity: 1.4,
          ease: 'none',
        },
        0
      );

      // Content: fade out + slight upward movement
      tl.to(
        content,
        {
          opacity: 0,
          y: '-30%',
          ease: 'none',
        },
        0
      );
    }, hero);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="image-hero" id="hero">
      {/* Loading state */}
      <div className={`image-hero__loading ${isLoaded ? 'image-hero__loading--hidden' : ''}`}>
        <div className="image-hero__loading-pulse" />
      </div>

      {/* Image Container — animated by ScrollTrigger */}
      <div ref={mediaRef} className="image-hero__media">
        <img
          src="/images/unity-church-exterior.png"
          alt="Unity Church — exterior view of the church building with its sign visible"
          className={`image-hero__img ${isLoaded ? 'image-hero__img--loaded' : 'image-hero__img--loading'}`}
          onLoad={() => setIsLoaded(true)}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Film grain texture */}
      <div className="image-hero__grain" />

      {/* Dark gradient overlay — opacity animated by ScrollTrigger */}
      <div ref={overlayRef} className="image-hero__overlay" />

      {/* Soft vignette */}
      <div className="image-hero__vignette" />

      {/* Text content — animated by ScrollTrigger */}
      <div ref={contentRef} className="image-hero__content">
        <h1 className="image-hero__title">Unity Church</h1>
        <p className="image-hero__subtitle">
          A Place to Worship.<br />
          A Place to Belong.<br />
          A Place to Grow.
        </p>
        <div className="image-hero__actions">
          <a href="#visit" className="image-hero__cta image-hero__cta--primary">
            Plan Your Visit →
          </a>
          <a href="#about" className="image-hero__cta image-hero__cta--ghost">
            Discover Unity →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="image-hero__scroll-hint"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <span className="image-hero__scroll-text">Scroll</span>
        <div className="image-hero__scroll-chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
