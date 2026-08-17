import './ChurchLogo.css';

/**
 * ChurchLogo — Reusable official Unity Christian Church logo component.
 *
 * Single source of truth for the church's primary branding asset.
 * Supports two visual variants:
 *   - "dark"  → Black logo on light backgrounds (default)
 *   - "light" → White/inverted logo on dark backgrounds (hero, dark sections)
 *
 * @param {object} props
 * @param {"dark"|"light"} [props.variant="dark"]  - Color variant
 * @param {number}         [props.height=40]       - Height in pixels
 * @param {string}         [props.className]       - Additional CSS classes
 */
export default function ChurchLogo({ variant = 'dark', height = 40, className = '' }) {
  return (
    <img
      src="/images/unity-christian-church-logo.png"
      alt="Unity Christian Church"
      className={`church-logo church-logo--${variant} ${className}`}
      style={{ height: `${height}px` }}
      draggable="false"
    />
  );
}
