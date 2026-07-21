import { useRef, useEffect, useState } from 'react';
import './FadeSection.css';

/**
 * FadeSection — reusable wrapper that fades content in when scrolled into view.
 * Uses IntersectionObserver for performance.
 * 
 * @param {Object} props
 * @param {'up'|'down'|'left'|'right'|'scale'|'none'} props.direction - animation direction
 * @param {number} props.delay - animation delay in seconds
 * @param {number} props.threshold - visibility threshold (0–1)
 * @param {string} props.className - additional CSS classes
 * @param {boolean} props.once - only animate once (default: true)
 */
export default function FadeSection({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  once = true,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const directionClass = `fade-section--${direction}`;

  return (
    <Tag
      ref={ref}
      className={`fade-section ${directionClass} ${isVisible ? 'fade-section--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
