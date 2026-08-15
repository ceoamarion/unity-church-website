import { ScrollScene, MediaCanvas, TextReveal, ProgressBar } from '../../components/cinematic';
import { SCENE_TIMELINE, getActiveScene } from '../../components/cinematic/sceneTimeline';
import './Hero.css';

/**
 * Hero — The scroll-driven construction experience.
 * 
 * PRESERVED: This component is kept intact for backward compatibility.
 * It is currently unused on the Unity Church homepage (replaced by ImageHero),
 * but remains available for the ConstructionPreview dev route and future U Impact use.
 * 
 * Architecture:
 *   ScrollScene (owns scroll → progress)
 *     └── MediaCanvas → VideoRenderer (scrubs video to progress)
 *     └── TextReveal × 8 (fade text overlays synced to scene boundaries)
 *     └── ProgressBar (thin progress indicator)
 *     └── ScrollIndicator (initial "Begin the Journey" prompt)
 */
export default function Hero() {
  return (
    <ScrollScene height="600vh" id="hero" scrub={0.5}>
      {({ progress, isActive, progressRef }) => {
        const activeScene = getActiveScene(progress);
        const phaseIndex = activeScene ? activeScene.phase : 1;

        return (
          <>
            {/* Video / Media Layer */}
            <MediaCanvas
              scrollProgress={progress}
              currentPhase={phaseIndex}
              renderer="video"
              progressRef={progressRef}
              videoSrc="/video/construction.mp4"
            />

            {/* Dark gradient overlay for text legibility */}
            <div className="hero__overlay" />

            {/* Scene text overlays — each fades in/out at its timeline range */}
            <div className="hero__text-layer">
              {SCENE_TIMELINE.map((scene) => (
                <TextReveal
                  key={scene.id}
                  label={scene.label}
                  title={scene.title}
                  subtitle={scene.subtitle}
                  progress={progress}
                  range={scene.range}
                  textStyle={scene.textStyle}
                  phase={scene.phase}
                />
              ))}
            </div>

            {/* Scroll indicator — visible only at the very beginning */}
            <div
              className="hero__scroll-hint"
              style={{
                opacity: progress < 0.03 ? 1 : Math.max(0, 1 - (progress - 0.03) * 30),
                pointerEvents: progress > 0.05 ? 'none' : 'auto',
              }}
            >
              <span className="hero__scroll-hint-text text-label">Begin the Journey</span>
              <div className="hero__scroll-chevron">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </div>
            </div>

            {/* Progress bar */}
            <ProgressBar
              progress={progress}
              isVisible={isActive && progress > 0.02}
              activeScene={activeScene}
            />

            {/* Top gradient vignette */}
            <div className="hero__vignette-top" />
            {/* Bottom gradient vignette */}
            <div className="hero__vignette-bottom" />
          </>
        );
      }}
    </ScrollScene>
  );
}
