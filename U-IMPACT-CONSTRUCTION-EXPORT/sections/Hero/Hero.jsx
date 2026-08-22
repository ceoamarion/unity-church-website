import ScrollScene from '../../components/ScrollScene/ScrollScene';
import MediaCanvas from '../../components/MediaCanvas/MediaCanvas';
import TextReveal from '../../components/TextReveal/TextReveal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { SCENE_TIMELINE, getActiveScene } from '../../data/sceneTimeline';
import './Hero.css';

/**
 * Hero — Scroll-driven construction experience orchestrator.
 * 
 * Architecture:
 *   ScrollScene (owns scroll → progress mapping)
 *     └── MediaCanvas → VideoRenderer (scrubs video smoothly to progress)
 *     └── TextReveal (fades text overlays synced to scene boundaries)
 *     └── ProgressBar (displays scroll completion & active phase label)
 *     └── Scroll hint ("Begin the Journey")
 * 
 * @param {Object} props
 * @param {string} props.videoSrc - URL to the construction video (default: "/video/construction.mp4")
 * @param {Array} props.scenes - timeline configuration array (default: SCENE_TIMELINE)
 * @param {string} props.height - runway height (default: "600vh")
 * @param {string} props.id - section ID (default: "hero")
 */
export default function Hero({
  videoSrc = '/video/construction.mp4',
  scenes = SCENE_TIMELINE,
  height = '600vh',
  id = 'hero',
}) {
  return (
    <ScrollScene height={height} id={id} scrub={0.5}>
      {({ progress, isActive, progressRef }) => {
        const activeScene = getActiveScene(progress, scenes);
        const phaseIndex = activeScene ? activeScene.phase : 1;

        return (
          <>
            {/* Video / Media Layer */}
            <MediaCanvas
              scrollProgress={progress}
              currentPhase={phaseIndex}
              renderer="video"
              progressRef={progressRef}
              videoSrc={videoSrc}
            />

            {/* Dark gradient overlay for text legibility */}
            <div className="hero__overlay" />

            {/* Scene text overlays — each fades in/out at its timeline range */}
            <div className="hero__text-layer">
              {scenes.map((scene) => (
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
