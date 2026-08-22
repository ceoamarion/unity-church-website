import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImpactCanvas from './ImpactCanvas';
import ImpactOverlay from './ImpactOverlay';
import ImpactHUD from './ImpactHUD';
import { impactAudio } from './ImpactAudio';
import './ImpactIntro.css';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactIntro({ onExploreClick, onGetInvolvedClick }) {
  const runwayRef = useRef(null);
  const viewportRef = useRef(null);

  const [progress, setProgress] = useState(0.0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
    }
  }, []);

  // Initialize GSAP ScrollTrigger pinning runway
  useEffect(() => {
    const runway = runwayRef.current;
    const viewport = viewportRef.current;
    if (!runway || !viewport) return;

    const st = ScrollTrigger.create({
      trigger: runway,
      start: 'top top',
      end: 'bottom bottom',
      pin: viewport,
      pinSpacing: true,
      scrub: isReducedMotion ? 0.1 : 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        impactAudio.updateProgress(p);
      }
    });

    return () => {
      st.kill();
    };
  }, [isReducedMotion]);

  // Jump to specific scene progress
  const handleJumpToProgress = useCallback((targetProgress) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const runwayTop = runway.offsetTop;
    const runwayHeight = runway.offsetHeight - window.innerHeight;
    const targetScrollY = runwayTop + targetProgress * runwayHeight;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  }, []);

  // Node hover handler for 3D raycasting
  const handleHoverNode = useCallback((nodeData) => {
    setHoveredNode(nodeData);
  }, []);

  return (
    <section 
      ref={runwayRef} 
      className="impact-intro-runway"
      id="cinematic-intro"
    >
      <div ref={viewportRef} className="impact-intro-viewport">
        {/* 3D WebGL Canvas Layer */}
        <ImpactCanvas 
          progress={progress}
          onHoverNode={handleHoverNode}
          isReducedMotion={isReducedMotion}
        />

        {/* Ambient Dark Vignette & Gradient Overlays */}
        <div className="impact-vignette-overlay" />

        {/* Synchronized Editorial Typography Layer */}
        <ImpactOverlay 
          progress={progress}
          onExploreClick={onExploreClick}
          onGetInvolvedClick={onGetInvolvedClick}
        />

        {/* HUD Controls & Gauge Layer */}
        <ImpactHUD 
          progress={progress}
          onJumpToProgress={handleJumpToProgress}
          hoveredNode={hoveredNode}
          isAudioActive={isAudioActive}
          setIsAudioActive={setIsAudioActive}
          isReducedMotion={isReducedMotion}
          setIsReducedMotion={setIsReducedMotion}
        />
      </div>
    </section>
  );
}
