import { useRef, useState, useCallback } from 'react';
import './TeamCard.css';

/**
 * TeamCard — Interactive 3D Holographic Leadership Profile Card.
 * 
 * Features:
 * - Substantial portrait area (upper 42-45% of card) showing full face and shoulders.
 * - Smooth pointer-tracking 3D perspective tilt (rotateX: ±3.5deg, rotateY: ±3.5deg).
 * - Subtle elevation lift (translateY: -10px, translateZ: 15px).
 * - Translucent holographic light & iridescent glass reflection following cursor position.
 * - Parallax depth layer on the portrait image and badge.
 * - Elegant warm gold/amber glow matching Unity Christian Church branding.
 * - Touch & reduced-motion friendly (gracefully falls back on touch devices and prefers-reduced-motion).
 */
export default function TeamCard({ member }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});
  const [sheenStyle, setSheenStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef(null);

  const handlePointerMove = useCallback((e) => {
    // Disable 3D tilt on touch devices or if reduced motion is requested
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within card
      const y = e.clientY - rect.top;  // y position within card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized coordinates from -1 to 1
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      // Small, elegant rotation angles (max ±3.8 degrees)
      const rotateX = -normY * 3.8;
      const rotateY = normX * 3.8;

      // Parallax shifts for internal layers
      const parallaxX = normX * 4;
      const parallaxY = normY * 4;

      setTransformStyle({
        transform: `perspective(1000px) translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`,
        '--parallax-x': `${parallaxX.toFixed(2)}px`,
        '--parallax-y': `${parallaxY.toFixed(2)}px`,
      });

      // Holographic sheen position following cursor
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      setSheenStyle({
        opacity: 1,
        background: `radial-gradient(circle 280px at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(255, 255, 255, 0.22) 0%, rgba(200, 149, 108, 0.16) 28%, rgba(232, 206, 181, 0.06) 55%, transparent 80%)`,
      });
    });
  }, []);

  const handlePointerEnter = useCallback((e) => {
    if (e.pointerType !== 'touch') {
      setIsHovered(true);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setIsHovered(false);
    setTransformStyle({
      transform: 'perspective(1000px) translateY(0deg) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      '--parallax-x': '0px',
      '--parallax-y': '0px',
    });
    setSheenStyle({
      opacity: 0,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`team-card ${member.featured ? 'team-card--featured' : ''} ${isHovered ? 'team-card--hovered' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={transformStyle}
    >
      {/* 3D Elevation Container */}
      <div className="team-card__3d-wrap">
        {/* Hologram / Sheen Highlight Layer */}
        <div className="team-card__sheen" style={sheenStyle} aria-hidden="true" />

        {/* Ambient Warm Hologram Border Glow */}
        <div className="team-card__hologram-glow" aria-hidden="true" />

        {/* Portrait Image Container */}
        <div className="team-card__image-wrap">
          <img
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            className="team-card__image"
            style={{ objectPosition: member.objectPosition || 'center 12%' }}
            loading="eager"
          />
          
          {/* Subtle Holographic Light Scanline / Iridescence */}
          <div className="team-card__holo-overlay" aria-hidden="true" />

          {/* Smooth Bottom Vignette to blend into card body */}
          <div className="team-card__image-overlay" />

          {/* 3D Depth Role Badge */}
          <span className="team-card__badge text-label">
            {member.role}
          </span>
        </div>

        {/* Card Content Information */}
        <div className="team-card__content">
          <span className="team-card__dept text-label">{member.department}</span>
          <h3 className="team-card__name">{member.name}</h3>
          <div className="team-card__divider" />
          <p className="team-card__passage">{member.passage}</p>
        </div>
      </div>
    </div>
  );
}
