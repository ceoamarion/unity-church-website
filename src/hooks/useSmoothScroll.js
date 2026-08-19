import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useSmoothScroll — initializes Lenis smooth scrolling and syncs with GSAP.
 * Provides smart centered scrolling for anchor navigation so sections are
 * perfectly framed in the viewport without cutting off content or text.
 * 
 * @param {Object} options
 * @param {number} options.lerp - interpolation factor (default: 0.1)
 * @param {number} options.duration - scroll duration (default: 1.2)
 * @param {string} options.orientation - scroll direction (default: "vertical")
 * @returns {{ lenisRef: React.RefObject, scrollTo: Function }}
 */
export function useSmoothScroll({
  lerp = 0.1,
  duration = 1.2,
  orientation = 'vertical',
} = {}) {
  const lenisRef = useRef(null);

  const scrollTo = useCallback((target, customOptions = {}) => {
    if (!target) return;
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    // Special case for hero / top of page
    if (targetElement.id === 'hero' || target === '#hero') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          ...customOptions,
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Dynamically measure the live navigation header height
    const navElement = document.querySelector('.nav') || document.querySelector('nav') || document.querySelector('header');
    const headerHeight = navElement ? navElement.getBoundingClientRect().height : (window.innerWidth <= 768 ? 56 : 64);
    const offset = -Math.round(headerHeight);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...customOptions,
      });
    } else {
      const top = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY + offset);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp,
      duration,
      orientation,
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Global anchor click interceptor for internal hash navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#/')) return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      scrollTo(targetEl);
      history.pushState(null, '', href);
    };

    document.addEventListener('click', handleAnchorClick);

    // If initial load has hash (e.g. #about, #pastor, #visit, #give)
    const scrollToHash = (immediate = false) => {
      if (window.location.hash && !window.location.hash.startsWith('#/')) {
        const hash = window.location.hash;
        const initialTarget = document.querySelector(hash);
        if (initialTarget) {
          scrollTo(initialTarget, immediate ? { immediate: true } : {});
        }
      }
    };

    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      requestAnimationFrame(() => scrollToHash(true));
      setTimeout(() => scrollToHash(false), 150);
      setTimeout(() => scrollToHash(false), 450);
      window.addEventListener('load', () => scrollToHash(false), { once: true });
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [lerp, duration, orientation, scrollTo]);

  return { lenisRef, scrollTo };
}

export default useSmoothScroll;
