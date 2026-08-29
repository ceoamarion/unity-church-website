import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollProgress — tracks normalized 0→1 scroll progress for a section.
 * 
 * @param {Object} options
 * @param {string} options.trigger - CSS selector or ref for the trigger element
 * @param {string} options.start - ScrollTrigger start position (default: "top top")
 * @param {string} options.end - ScrollTrigger end position (default: "bottom bottom")
 * @param {boolean} options.pin - whether to pin the trigger element
 * @param {boolean|number} options.scrub - whether to scrub the animation (default: true / 0.5)
 * @param {Function} options.onUpdate - callback on progress update
 * @returns {{ progress: number, triggerRef: React.RefObject }}
 */
export function useScrollProgress({
  start = 'top top',
  end = 'bottom bottom',
  pin = false,
  scrub = true,
  onUpdate,
} = {}) {
  const triggerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const scrollTriggerRef = useRef(null);

  const handleUpdate = useCallback((self) => {
    setProgress(self.progress);
    onUpdate?.(self.progress);
  }, [onUpdate]);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin,
      scrub: scrub === true ? 0.5 : scrub,
      onUpdate: handleUpdate,
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [start, end, pin, scrub, handleUpdate]);

  return { progress, triggerRef };
}

/**
 * useScrollReveal — triggers visibility class when element enters viewport.
 *
 * @param {Object} options
 * @param {string} options.start - ScrollTrigger start position
 * @param {boolean} options.once - only trigger once (default: true)
 * @returns {{ isVisible: boolean, revealRef: React.RefObject }}
 */
export function useScrollReveal({ start = 'top 85%', once = true } = {}) {
  const revealRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => setIsVisible(true),
      onLeaveBack: once ? undefined : () => setIsVisible(false),
    });

    return () => trigger.kill();
  }, [start, once]);

  return { isVisible, revealRef };
}

export default useScrollProgress;
