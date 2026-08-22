import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaCanvas from '../../components/MediaCanvas/MediaCanvas';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './Construction.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Construction — Sticky scroll-driven section that builds the structure.
 * Pinned for ~500vh of scroll distance, driving MediaCanvas through 5 phases.
 * 
 * @param {Object} props
 * @param {string} props.videoSrc - URL to the construction video (default: "/video/construction.mp4")
 * @param {Array} props.phases - optional custom phase configurations
 * @param {string} props.id - section ID for anchor navigation
 */
const DEFAULT_PHASES = [
  {
    range: [0, 0.2],
    label: 'A vision begins',
    description: 'Every great journey starts with a single step of faith.',
  },
  {
    range: [0.2, 0.4],
    label: 'Breaking ground',
    description: 'The foundation is laid — strong, enduring, purposeful.',
  },
  {
    range: [0.4, 0.6],
    label: 'The framework rises',
    description: 'Structure emerges from the blueprint of belief.',
  },
  {
    range: [0.6, 0.8],
    label: 'Taking shape',
    description: 'Walls embrace the space. Light finds its way in.',
  },
  {
    range: [0.8, 1.0],
    label: 'A sanctuary is born',
    description: 'From vision to reality — built by faith, united in purpose.',
  },
];

export default function Construction({
  videoSrc = '/video/construction.mp4',
  phases = DEFAULT_PHASES,
  id = 'construction',
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Determine current phase from progress
  useEffect(() => {
    const phase = phases.findIndex(
      (p) => progress >= p.range[0] && progress < p.range[1]
    );
    setCurrentPhase(phase === -1 ? phases.length - 1 : phase);
  }, [progress, phases]);

  // Set up ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      onEnter: () => setIsActive(true),
      onLeave: () => setIsActive(false),
      onEnterBack: () => setIsActive(true),
      onLeaveBack: () => setIsActive(false),
    });

    return () => trigger.kill();
  }, []);

  // Calculate text visibility for each phase
  const getPhaseVisibility = useCallback(
    (index) => {
      const phase = phases[index];
      if (!phase) return { opacity: 0, transform: 'translateY(30px)' };

      const phaseProgress =
        (progress - phase.range[0]) / (phase.range[1] - phase.range[0]);

      // Fade in for first 30% of phase, hold, fade out for last 20%
      let opacity = 0;
      if (phaseProgress > 0 && phaseProgress < 1) {
        if (phaseProgress < 0.3) {
          opacity = phaseProgress / 0.3;
        } else if (phaseProgress > 0.8) {
          opacity = (1 - phaseProgress) / 0.2;
        } else {
          opacity = 1;
        }
      }

      const translateY = phaseProgress < 0.3 ? (1 - phaseProgress / 0.3) * 30 : 0;

      return {
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${translateY}px)`,
      };
    },
    [progress, phases]
  );

  return (
    <>
      <ProgressBar progress={progress} isVisible={isActive} />

      <section ref={sectionRef} className="construction" id={id}>
        {/* Pinned viewport */}
        <div ref={stickyRef} className="construction__viewport">
          {/* MediaCanvas fills the viewport */}
          <MediaCanvas
            scrollProgress={progress}
            currentPhase={currentPhase + 1}
            videoSrc={videoSrc}
          />

          {/* Overlay gradient for text readability */}
          <div className="construction__overlay" />

          {/* Phase text overlays */}
          <div className="construction__text-container">
            {phases.map((phase, i) => (
              <div
                key={i}
                className="construction__phase-text"
                style={getPhaseVisibility(i)}
              >
                <span className="construction__phase-label text-label">
                  Phase {i + 1}
                </span>
                <h2 className="construction__phase-title text-display">
                  {phase.label}
                </h2>
                <p className="construction__phase-desc text-body-lg">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          {/* Journey text */}
          <div className="construction__journey">
            <span
              className="construction__journey-text text-accent"
              style={{
                opacity: progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 5),
              }}
            >
              From vision...
            </span>
            <span
              className="construction__journey-text construction__journey-text--end text-accent"
              style={{
                opacity: progress > 0.85 ? Math.min(1, (progress - 0.85) * 6.67) : 0,
              }}
            >
              ...to reality.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
