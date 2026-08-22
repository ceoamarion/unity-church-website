import { useMemo } from 'react';

/**
 * ImageRenderer — Layered CSS construction animation.
 * Uses dynamic gradients & SVG-style CSS visuals to simulate construction phases.
 * 
 * Phase breakdown:
 *   Phase 1 (0.00–0.20): Empty land / ground breaking
 *   Phase 2 (0.20–0.40): Foundation laid
 *   Phase 3 (0.40–0.60): Structure framing rises
 *   Phase 4 (0.60–0.80): Walls and exterior
 *   Phase 5 (0.80–1.00): Completed structure
 * 
 * @param {Object} props
 * @param {number} props.scrollProgress - 0 to 1 progress
 * @param {number} props.currentPhase - current phase number (1–5)
 */
export default function ImageRenderer({ scrollProgress = 0, currentPhase = 1 }) {
  // Pre-compute color values for the sky gradient
  const skyColors = useMemo(() => {
    const p = scrollProgress;
    return {
      topH: 210 + p * 15,
      topS: 30 + p * 20,
      topL: 65 + p * 15,
      midH: 35 + p * 10,
      midS: 60 + p * 20,
      midL: 80 + p * 10,
    };
  }, [scrollProgress]);

  return (
    <div className="image-renderer">
      {/* Sky Layer */}
      <div
        className="image-renderer__sky"
        style={{
          background: `linear-gradient(
            180deg,
            hsl(${skyColors.topH}, ${skyColors.topS}%, ${skyColors.topL}%) 0%,
            hsl(${skyColors.midH}, ${skyColors.midS}%, ${skyColors.midL}%) 60%,
            hsl(30, 40%, 90%) 100%
          )`,
        }}
      />

      {/* Sun / Light Source */}
      <div
        className="image-renderer__sun"
        style={{
          opacity: 0.4 + scrollProgress * 0.4,
          transform: `translate(-50%, ${-20 + scrollProgress * -30}%) scale(${1 + scrollProgress * 0.5})`,
        }}
      />

      {/* Ground Layer */}
      <div className="image-renderer__ground">
        {/* Ground texture layers */}
        <div
          className="image-renderer__soil"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        />
        <div
          className="image-renderer__grass"
          style={{ opacity: Math.min(1, scrollProgress * 1.5) }}
        />
      </div>

      {/* Construction Layers — stacked with increasing opacity/visibility */}
      <div
        className="image-renderer__construction"
        style={{
          opacity: Math.max(0, (scrollProgress - 0.1) / 0.9),
        }}
      >
        {/* Foundation */}
        <div
          className="image-renderer__foundation"
          style={{
            opacity: scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) * 5) : 0,
            transform: `scaleY(${scrollProgress > 0.1 ? Math.min(1, (scrollProgress - 0.1) * 5) : 0})`,
          }}
        />

        {/* Framework / Columns */}
        <div
          className="image-renderer__frame"
          style={{
            opacity: scrollProgress > 0.25 ? Math.min(1, (scrollProgress - 0.25) * 4) : 0,
            clipPath: `inset(${Math.max(0, 100 - (scrollProgress > 0.25 ? (scrollProgress - 0.25) * 400 : 0))}% 0 0 0)`,
          }}
        />

        {/* Walls */}
        <div
          className="image-renderer__walls"
          style={{
            opacity: scrollProgress > 0.4 ? Math.min(1, (scrollProgress - 0.4) * 3.5) : 0,
          }}
        />

        {/* Roof */}
        <div
          className="image-renderer__roof"
          style={{
            opacity: scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) * 4) : 0,
            transform: `translateY(${scrollProgress > 0.6 ? Math.max(0, (1 - (scrollProgress - 0.6) * 4)) * -20 : -20}px)`,
          }}
        />

        {/* Details */}
        <div
          className="image-renderer__details"
          style={{
            opacity: scrollProgress > 0.75 ? Math.min(1, (scrollProgress - 0.75) * 4) : 0,
          }}
        />

        {/* Landscaping */}
        <div
          className="image-renderer__landscaping"
          style={{
            opacity: scrollProgress > 0.85 ? Math.min(1, (scrollProgress - 0.85) * 6.67) : 0,
          }}
        />
      </div>

      {/* Ambient particles (dust, light rays) */}
      <div
        className="image-renderer__particles"
        style={{ opacity: 0.3 + scrollProgress * 0.3 }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="image-renderer__particle"
            style={{
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
