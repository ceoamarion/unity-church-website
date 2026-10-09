import React, { useState } from 'react';
import './UImpactButton.css';

/**
 * UImpactNavButton — Navigation button for U Impact with YouTube Subscribe-style
 * pill aesthetics and a sophisticated iridescent perimeter outline click animation.
 * 
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.isScrolled - Whether parent header is in scrolled state
 * @param {boolean} props.isMobile - Whether rendered inside mobile menu
 * @param {string} props.className - Additional classes
 */
export default function UImpactButton({
  onClick,
  isScrolled = false,
  isMobile = false,
  className = '',
}) {
  const [isActivating, setIsActivating] = useState(false);

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !onClick) return;
    e.preventDefault();
    if (isActivating) return;

    setIsActivating(true);

    // Allow the iridescent perimeter beam to race around the button before triggering navigation
    setTimeout(() => {
      if (onClick) {
        onClick();
      }
      setTimeout(() => {
        setIsActivating(false);
      }, 400);
    }, 450);
  };

  return (
    <a
      href="/u-impact/"
      className={`u-impact-btn ${isScrolled ? 'u-impact-btn--scrolled' : ''} ${isMobile ? 'u-impact-btn--mobile' : ''} ${isActivating ? 'u-impact-btn--activating' : ''} ${className}`}
      onClick={handleClick}
      aria-label="Experience U Impact"
      title="Experience U Impact"
    >
      {/* Iridescent Outline SVG Runner */}
      <svg
        className={`u-impact-btn__svg ${isActivating ? 'u-impact-btn__svg--active' : ''}`}
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Subtle multi-spectrum iridescent gradient */}
          <linearGradient id="uImpactIridescentBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A8A" />
            <stop offset="20%" stopColor="#FFAA5A" />
            <stop offset="40%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#5CE1E6" />
            <stop offset="80%" stopColor="#A066FF" />
            <stop offset="100%" stopColor="#FF5C98" />
          </linearGradient>

          {/* Soft outer glow filter */}
          <filter id="uImpactIridescentGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient base trace */}
        <rect
          className="u-impact-btn__track"
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          rx="48.5"
          pathLength="100"
          vectorEffect="non-scaling-stroke"
        />

        {/* Dynamic traveling iridescent outline beam */}
        <rect
          className="u-impact-btn__beam"
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          rx="48.5"
          pathLength="100"
          vectorEffect="non-scaling-stroke"
          stroke="url(#uImpactIridescentBeam)"
          filter="url(#uImpactIridescentGlow)"
        />
      </svg>

      {/* Button Content */}
      <span className="u-impact-btn__inner">
        <span className="u-impact-btn__dot" aria-hidden="true" />
        <span className="u-impact-btn__text">U IMPACT</span>
      </span>
    </a>
  );
}
