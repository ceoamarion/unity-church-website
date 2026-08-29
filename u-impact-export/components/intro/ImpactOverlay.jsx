import React from 'react';
import { ArrowDown, Sparkles, Compass, Users, HeartHandshake } from 'lucide-react';

export default function ImpactOverlay({ progress, onExploreClick, onGetInvolvedClick }) {
  // Helper to calculate smooth opacity for timeline ranges
  const getSceneAlpha = (start, fadeInEnd, fadeOutStart, end) => {
    if (progress < start || progress > end) return 0;
    if (start === fadeInEnd && progress <= fadeOutStart) return 1;
    if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
    if (progress < fadeInEnd) {
      const span = fadeInEnd - start;
      return span > 0 ? (progress - start) / span : 1;
    }
    const fadeSpan = end - fadeOutStart;
    return fadeSpan > 0 ? 1 - (progress - fadeOutStart) / fadeSpan : 0;
  };

  const alpha1 = getSceneAlpha(0.00, 0.00, 0.16, 0.22);
  const alpha2 = getSceneAlpha(0.22, 0.26, 0.40, 0.46);
  const alpha3 = getSceneAlpha(0.46, 0.50, 0.64, 0.70);
  const alpha4 = getSceneAlpha(0.70, 0.74, 0.86, 0.90);
  const alpha5 = Math.max(0, Math.min(1, (progress - 0.89) / 0.07));

  return (
    <div className="impact-overlay-layer">
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCENE 1: THE BEGINNING / DARK CLOUDS */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div 
        className="scene-block scene-1"
        style={{
          opacity: alpha1,
          transform: `translateY(${(1 - alpha1) * 20}px)`,
          pointerEvents: alpha1 > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="scene-badge">
          <span className="badge-dot pulse-gold"></span>
          <span className="badge-text">01 / THE SPARK</span>
        </div>
        <h1 className="scene-title font-display">
          Everything starts <span className="text-accent-gold italic">somewhere.</span>
        </h1>
        <p className="scene-subtitle font-sans">
          A quiet intention in the darkness. The anticipation of what is about to begin.
        </p>
        <div className="scene-scroll-hint">
          <span className="scroll-pill">
            <span className="mouse-wheel"></span>
            Scroll to set impact in motion
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCENE 2: LIGHT BREAKING CLOUDS */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div 
        className="scene-block scene-2"
        style={{
          opacity: alpha2,
          transform: `translateY(${(1 - alpha2) * 20}px)`,
          pointerEvents: alpha2 > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="scene-badge">
          <span className="badge-dot pulse-gold"></span>
          <span className="badge-text">02 / EMERGENCE</span>
        </div>
        <h2 className="scene-title font-display">
          Light breaks <br />
          <span className="text-gradient-gold">through the clouds.</span>
        </h2>
        <p className="scene-subtitle font-sans">
          One spark gathers momentum, purpose, and direction across the horizon.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCENE 3: CAMPUS & COMMUNITY REVEAL */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div 
        className="scene-block scene-3"
        style={{
          opacity: alpha3,
          transform: `translateY(${(1 - alpha3) * 20}px)`,
          pointerEvents: alpha3 > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="scene-badge">
          <span className="badge-dot pulse-gold"></span>
          <span className="badge-text">03 / THE PHYSICAL ANCHOR</span>
        </div>
        <h2 className="scene-title font-display">
          Reaching the <span className="text-accent-gold">ground.</span>
        </h2>
        <p className="scene-subtitle font-sans">
          Arriving at the campus — the physical space where community action takes root.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCENE 4: LIGHT SPREADING / PEOPLE */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div 
        className="scene-block scene-4"
        style={{
          opacity: alpha4,
          transform: `translateY(${(1 - alpha4) * 20}px)`,
          pointerEvents: alpha4 > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="scene-badge">
          <span className="badge-dot pulse-gold"></span>
          <span className="badge-text">04 / COLLECTIVE IMPACT</span>
        </div>
        <h2 className="scene-title font-display">
          The impact is not just the building.<br />
          <span className="text-accent-gold italic">The impact is the people.</span>
        </h2>
        <p className="scene-subtitle font-sans">
          Light radiating through mentors, volunteers, neighbors, and the next generation.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* SCENE 5: REVEAL U IMPACT */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div 
        className="scene-block scene-5"
        style={{
          opacity: alpha5,
          transform: `translateY(${(1 - alpha5) * 24}px) scale(${0.96 + alpha5 * 0.04})`,
          pointerEvents: alpha5 > 0.4 ? 'auto' : 'none'
        }}
      >
        <div className="brand-hero-lockup">
          <div className="brand-pre-label font-editorial">
            <span className="brand-dot"></span>
            A SOCIAL IMPACT PLATFORM
          </div>

          <h1 className="brand-master-title font-display">
            U <span className="text-gradient-gold">IMPACT</span>
          </h1>

          <h2 className="brand-headline font-editorial">
            Make an impact where you are.
          </h2>

          <p className="brand-description font-sans">
            Explore the people, events, and initiatives creating meaningful change in our communities.
          </p>

          <div className="brand-actions">
            <button 
              className="btn-primary"
              onClick={onExploreClick}
            >
              <Compass size={18} />
              EXPLORE THE IMPACT
            </button>

            <button 
              className="btn-secondary"
              onClick={onGetInvolvedClick}
            >
              <HeartHandshake size={18} />
              GET INVOLVED
            </button>
          </div>

          {/* Quick Pillar Stat Peek */}
          <div className="brand-quick-stats font-editorial">
            <div className="stat-pill">
              <span className="stat-num">14,200+</span>
              <span className="stat-lbl">Lives Touched</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-pill">
              <span className="stat-num">85+</span>
              <span className="stat-lbl">Initiatives</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-pill">
              <span className="stat-num">$2.4M</span>
              <span className="stat-lbl">Community Value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
