import VideoRenderer from './VideoRenderer';
import ImageRenderer from './ImageRenderer';
import './MediaCanvas.css';

/**
 * MediaCanvas — The key architectural abstraction component.
 * 
 * Routes to the active renderer based on `renderer` prop.
 * The scroll logic (ScrollScene) and overlay logic (Hero) never touch
 * the renderer directly — they only pass progress and phase data.
 * 
 * Renderers:
 *   'video'  → VideoRenderer (scroll-driven video scrubbing)
 *   'image'  → ImageRenderer (layered CSS construction — legacy fallback)
 *   'three'  → Future: React Three Fiber <Canvas> scene
 * 
 * @param {Object} props
 * @param {number} props.scrollProgress - normalized 0→1 scroll progress
 * @param {number} props.currentPhase - current construction phase (1–8)
 * @param {'video'|'image'|'three'} props.renderer - which renderer to use
 * @param {React.RefObject} props.progressRef - ref for non-stale progress reads
 * @param {string} props.className - additional CSS classes
 */
export default function MediaCanvas({
  scrollProgress = 0,
  currentPhase = 1,
  renderer = 'video',
  progressRef,
  className = '',
}) {
  return (
    <div className={`media-canvas ${className}`}>
      {renderer === 'video' && (
        <VideoRenderer
          progress={scrollProgress}
          progressRef={progressRef}
          src="/video/construction.mp4"
        />
      )}
      {renderer === 'image' && (
        <ImageRenderer
          scrollProgress={scrollProgress}
          currentPhase={currentPhase}
        />
      )}
      {/* Future: renderer === 'three' && <ThreeDRenderer ... /> */}
    </div>
  );
}
