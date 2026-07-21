import ImageRenderer from './ImageRenderer';
import './MediaCanvas.css';

/**
 * MediaCanvas — The key architectural abstraction component.
 * 
 * This component decouples the visual storytelling from the scroll logic and page layout.
 * 
 * Phase 1 (current): Uses ImageRenderer with layered images + CSS transforms.
 * Phase 2 (future):  Swap ImageRenderer with a React Three Fiber <Canvas> scene.
 *                     The API (scrollProgress, currentPhase) stays identical.
 * 
 * @param {Object} props
 * @param {number} props.scrollProgress - normalized 0→1 scroll progress
 * @param {number} props.currentPhase - current construction phase (1–5)
 * @param {string} props.className - additional CSS classes
 */
export default function MediaCanvas({ scrollProgress = 0, currentPhase = 1, className = '' }) {
  return (
    <div className={`media-canvas ${className}`}>
      {/* 
        FUTURE: Replace ImageRenderer with:
        <ThreeDRenderer scrollProgress={scrollProgress} currentPhase={currentPhase} />
        
        The parent component (Construction) doesn't need to change at all.
      */}
      <ImageRenderer
        scrollProgress={scrollProgress}
        currentPhase={currentPhase}
      />
    </div>
  );
}
