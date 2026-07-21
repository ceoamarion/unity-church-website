import { useRef, useState, useEffect } from 'react';
import FadeSection from '../../components/FadeSection/FadeSection';
import './Transition.css';

/**
 * Transition — Cinematic bridge between exterior completion and interior showcase.
 * "Step inside." with dramatic scale animation.
 */
export default function Transition() {
  const sectionRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1,
        1 - rect.top / window.innerHeight
      ));
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="transition" id="transition">
      <div className="transition__bg" />

      <div className="transition__content">
        <FadeSection direction="scale" delay={0}>
          <div className="transition__inner">
            {/* Doorway visual */}
            <div
              className="transition__doorway"
              style={{
                transform: `scale(${1 + scrollRatio * 2})`,
                opacity: Math.max(0, 1 - scrollRatio * 1.5),
              }}
            >
              <div className="transition__door-frame">
                <div className="transition__door-light" />
              </div>
            </div>

            {/* Text */}
            <FadeSection direction="up" delay={0.2}>
              <p className="transition__label text-label">Welcome</p>
            </FadeSection>
            <FadeSection direction="up" delay={0.4}>
              <h2 className="transition__title text-hero">
                Step inside.
              </h2>
            </FadeSection>
            <FadeSection direction="up" delay={0.6}>
              <p className="transition__subtitle text-accent text-body-lg">
                Experience the spaces where community comes alive.
              </p>
            </FadeSection>
          </div>
        </FadeSection>
      </div>

      {/* Bottom gradient */}
      <div className="transition__fade-bottom" />
    </section>
  );
}
