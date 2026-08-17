import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollScene.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollScene — Reusable scroll-driven cinematic section.
 * 
 * Pins a viewport-sized container and exposes a normalized progress (0→1)
 * that children use to drive animations, video scrubbing, and text reveals.
 * 
 * Architecture: This component owns the scroll → progress mapping.
 * It does NOT know about videos, images, or Three.js — those are children.
 * 
 * @param {Object} props
 * @param {string} props.height - CSS height for the scroll runway (e.g. "600vh")
 * @param {Function} props.children - render function receiving { progress, isActive }
 * @param {string} props.id - section id for anchor links
 * @param {string} props.className - additional classes
 * @param {number} props.scrub - GSAP scrub smoothing (default: 0.5)
 */
export default function ScrollScene({
  height = '600vh',
  children,
  id,
  className = '',
  scrub = 0.5,
}) {
  const runwayRef = useRef(null);
  const viewportRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Store progress in a ref for non-reactive reads (video scrubbing)
  const progressRef = useRef(0);

  const handleProgress = useCallback((value) => {
    progressRef.current = value;
    setProgress(value);
  }, []);

  useEffect(() => {
    const runway = runwayRef.current;
    const viewport = viewportRef.current;
    if (!runway || !viewport) return;

    const trigger = ScrollTrigger.create({
      trigger: runway,
      start: 'top top',
      end: 'bottom bottom',
      pin: viewport,
      scrub,
      onUpdate: (self) => {
        handleProgress(self.progress);
      },
      onEnter: () => setIsActive(true),
      onLeave: () => setIsActive(false),
      onEnterBack: () => setIsActive(true),
      onLeaveBack: () => setIsActive(false),
    });

    return () => trigger.kill();
  }, [scrub, handleProgress]);

  return (
    <section
      ref={runwayRef}
      className={`scroll-scene ${className}`}
      id={id}
      style={{ height }}
    >
      <div ref={viewportRef} className="scroll-scene__viewport">
        {typeof children === 'function'
          ? children({ progress, isActive, progressRef })
          : children}
      </div>
    </section>
  );
}
