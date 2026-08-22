import './CinematicScrollExperience.css';
import ScrollScene from '../ScrollScene/ScrollScene';
import MediaCanvas from '../MediaCanvas/MediaCanvas';
import TextReveal from '../TextReveal/TextReveal';
import ProgressBar from '../ProgressBar/ProgressBar';
import { getActiveScene } from '../../data/sceneTimeline';

/**
 * CinematicScrollExperience — Reusable scroll-driven cinematic section.
 * 
 * Composes the full cinematic pipeline from data-driven scene definitions.
 * Any site (Unity Church, U Impact, etc.) can provide its own scenes and video.
 * 
 * @param {Object} props
 * @param {Array} props.scenes - Array of scene objects with id, phase, label, title, subtitle, range, textStyle
 * @param {string} props.videoSrc - URL to the video asset (e.g. "/video/construction.mp4")
 * @param {string} props.height - CSS height for the scroll runway (default: "600vh")
 * @param {number} props.scrub - GSAP scrub smoothing (default: 0.5)
 * @param {string} props.id - section id for anchor links (default: "cinematic")
 * @param {string} props.scrollHintText - text for the scroll indicator (default: "Begin the Journey")
 * @param {'video'|'image'} props.renderer - media renderer type (default: "video")
 */
export default function CinematicScrollExperience({
  scenes = [],
  videoSrc = '',
  height = '600vh',
  scrub = 0.5,
  id = 'cinematic',
  scrollHintText = 'Begin the Journey',
  renderer = 'video',
}) {
  return (
    <ScrollScene height={height} id={id} scrub={scrub}>
      {({ progress, isActive, progressRef }) => {
        const activeScene = getActiveScene(progress, scenes);
        const phaseIndex = activeScene ? activeScene.phase : 1;

        return (
          <>
            {/* Video / Media Layer */}
            <MediaCanvas
              scrollProgress={progress}
              currentPhase={phaseIndex}
              renderer={renderer}
              progressRef={progressRef}
              videoSrc={videoSrc}
            />

            {/* Dark gradient overlay for text legibility */}
            <div className="cinematic__overlay" />

            {/* Scene text overlays — each fades in/out at its timeline range */}
            <div className="cinematic__text-layer">
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
              className="cinematic__scroll-hint"
              style={{
                opacity: progress < 0.03 ? 1 : Math.max(0, 1 - (progress - 0.03) * 30),
                pointerEvents: progress > 0.05 ? 'none' : 'auto',
              }}
            >
              <span className="cinematic__scroll-hint-text text-label">{scrollHintText}</span>
              <div className="cinematic__scroll-chevron">
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
            <div className="cinematic__vignette-top" />
            {/* Bottom gradient vignette */}
            <div className="cinematic__vignette-bottom" />
          </>
        );
      }}
    </ScrollScene>
  );
}
