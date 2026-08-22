import './TextReveal.css';

/**
 * TextReveal — Cinematic text overlay synced to scroll progress.
 * 
 * Calculates visibility based on a scene's progress range:
 * - Fades in during the first 20% of the scene
 * - Holds fully visible for 55% of the scene
 * - Fades out during the last 25% of the scene
 * 
 * @param {Object} props
 * @param {string} props.label - small uppercase label (e.g. "Phase 01")
 * @param {string} props.title - large display title (supports \n for line breaks)
 * @param {string} props.subtitle - body text beneath the title
 * @param {number} props.progress - global scroll progress 0→1
 * @param {number[]} props.range - [start, end] progress range for this scene
 * @param {'hero'|'default'|'climax'} props.textStyle - visual style variant
 * @param {number} props.phase - scene number for display
 */
export default function TextReveal({
  label,
  title,
  subtitle,
  progress = 0,
  range = [0, 1],
  textStyle = 'default',
  phase,
}) {
  const [start, end] = range;
  const span = end - start;
  if (span === 0) return null;

  // Normalize progress within this scene
  const localProgress = Math.max(0, Math.min(1, (progress - start) / span));

  // Visibility envelope: fade in (0→0.2), hold (0.2→0.75), fade out (0.75→1)
  let opacity = 0;
  let translateY = 30;
  let scale = 0.97;
  let blur = 8;

  if (localProgress > 0 && localProgress < 1) {
    if (localProgress < 0.2) {
      // Fade in
      const t = localProgress / 0.2;
      opacity = t;
      translateY = 30 * (1 - t);
      scale = 0.97 + 0.03 * t;
      blur = 8 * (1 - t);
    } else if (localProgress > 0.75) {
      // Fade out
      const t = (localProgress - 0.75) / 0.25;
      opacity = 1 - t;
      translateY = -20 * t;
      scale = 1 - 0.02 * t;
      blur = 6 * t;
    } else {
      // Hold
      opacity = 1;
      translateY = 0;
      scale = 1;
      blur = 0;
    }
  }

  // Don't render if fully invisible
  if (opacity <= 0.01) return null;

  const isHero = textStyle === 'hero';
  const isClimax = textStyle === 'climax';

  // Split title by \n for line breaks
  const titleLines = (title || '').split('\n');

  return (
    <div
      className={`text-reveal ${isHero ? 'text-reveal--hero' : ''} ${isClimax ? 'text-reveal--climax' : ''}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {/* Phase label */}
      {label && !isHero && (
        <span className="text-reveal__label text-label">
          {phase ? `0${phase} — ` : ''}{label}
        </span>
      )}

      {/* Title */}
      <h2 className={`text-reveal__title ${isHero ? 'text-hero' : isClimax ? 'text-display' : 'text-h1'}`}>
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-reveal__subtitle ${isHero ? 'text-body-lg' : 'text-body-lg'}`}>
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      {!isHero && <div className="text-reveal__line" />}
    </div>
  );
}
