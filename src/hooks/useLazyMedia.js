import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useLazyMedia — IntersectionObserver-based lazy loading for images/media.
 * Returns isLoaded state and a ref to attach to the element.
 * 
 * @param {Object} options
 * @param {string} options.rootMargin - margin around root (default: "200px")
 * @param {number} options.threshold - visibility threshold (default: 0)
 * @returns {{ isInView: boolean, hasLoaded: boolean, lazyRef: React.RefObject }}
 */
export function useLazyMedia({ rootMargin = '200px', threshold = 0 } = {}) {
  const lazyRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const el = lazyRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { isInView, hasLoaded, onLoad, lazyRef };
}

export default useLazyMedia;
