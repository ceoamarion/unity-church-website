import { useRef, useEffect, useState } from 'react';
import './ParallaxImage.css';

/**
 * ParallaxImage — image wrapper with configurable parallax speed.
 * Includes lazy loading via IntersectionObserver.
 * 
 * @param {Object} props
 * @param {string} props.src - image source URL
 * @param {string} props.alt - alt text
 * @param {number} props.speed - parallax speed multiplier (default: 0.3)
 * @param {string} props.aspectRatio - CSS aspect ratio (default: "16/10")
 * @param {string} props.className - additional classes
 */
export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  aspectRatio = '16/10',
  className = '',
}) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [offset, setOffset] = useState(0);

  // Lazy loading
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax effect
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isInView) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distFromCenter = (elementCenter - windowHeight / 2) / windowHeight;
      setOffset(distFromCenter * speed * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isInView]);

  return (
    <div
      ref={containerRef}
      className={`parallax-image ${isLoaded ? 'parallax-image--loaded' : ''} ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && <div className="parallax-image__placeholder img-placeholder" />}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className="parallax-image__img"
          style={{ transform: `translateY(${offset}px) scale(1.15)` }}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
