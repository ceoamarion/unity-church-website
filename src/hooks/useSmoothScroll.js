import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useSmoothScroll — initializes Lenis smooth scrolling and syncs with GSAP.
 * Should be called once at the app root level.
 * 
 * @param {Object} options
 * @param {number} options.lerp - interpolation factor (default: 0.1)
 * @param {number} options.duration - scroll duration (default: 1.2)
 * @param {string} options.orientation - scroll direction (default: "vertical")
 * @returns {{ lenisRef: React.RefObject }}
 */
export function useSmoothScroll({
  lerp = 0.1,
  duration = 1.2,
  orientation = 'vertical',
} = {}) {
  const lenisRef = useRef(null);

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

    // Sync Lenis with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp, duration, orientation]);

  return { lenisRef };
}

export default useSmoothScroll;
