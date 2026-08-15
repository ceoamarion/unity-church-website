import { useState, useEffect } from 'react';
import './ScrollIndicator.css';

/**
 * ScrollIndicator — animated "scroll to explore" indicator.
 * Fades out as user begins scrolling.
 */
export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-indicator ${!isVisible ? 'scroll-indicator--hidden' : ''}`}>
      <span className="scroll-indicator__text">Scroll to explore</span>
      <div className="scroll-indicator__line">
        <div className="scroll-indicator__dot" />
      </div>
    </div>
  );
}
