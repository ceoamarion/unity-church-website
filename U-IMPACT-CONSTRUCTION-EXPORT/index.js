/**
 * ============================================================================
 * U-IMPACT CONSTRUCTION EXPERIENCE — BARREL EXPORT & ENTRY POINT
 * ============================================================================
 * 
 * Self-contained, portable interactive scroll & construction animation system.
 * 
 * QUICK START:
 *   import { CinematicScrollExperience, SCENE_TIMELINE } from './U-IMPACT-CONSTRUCTION-EXPORT';
 *   import './U-IMPACT-CONSTRUCTION-EXPORT/styles/tokens.css';
 * 
 *   function App() {
 *     return (
 *       <main>
 *         <CinematicScrollExperience
 *           scenes={SCENE_TIMELINE}
 *           videoSrc="/video/construction.mp4"
 *           height="600vh"
 *         />
 *       </main>
 *     );
 *   }
 */

// ─── Primary Orchestrator & Cinematic Engine ────────────────────────────────
export { default as CinematicScrollExperience } from './components/CinematicScrollExperience/CinematicScrollExperience';
export { default as ScrollScene } from './components/ScrollScene/ScrollScene';
export { default as MediaCanvas } from './components/MediaCanvas/MediaCanvas';
export { default as VideoRenderer } from './components/MediaCanvas/VideoRenderer';
export { default as ImageRenderer } from './components/MediaCanvas/ImageRenderer';
export { default as TextReveal } from './components/TextReveal/TextReveal';
export { default as ProgressBar } from './components/ProgressBar/ProgressBar';
export { default as ScrollIndicator } from './components/ScrollIndicator/ScrollIndicator';
export { default as FadeSection } from './components/FadeSection/FadeSection';
export { default as ParallaxImage } from './components/ParallaxImage/ParallaxImage';

// ─── Full Pre-built Sections ────────────────────────────────────────────────
export { default as Hero } from './sections/Hero/Hero';
export { default as Construction } from './sections/Construction/Construction';
export { default as Transition } from './sections/Transition/Transition';
export { default as InteriorShowcase, DEFAULT_SPACES } from './sections/InteriorShowcase/InteriorShowcase';

// ─── Preview Page ───────────────────────────────────────────────────────────
export { default as ConstructionPreview } from './pages/ConstructionPreview';

// ─── Custom React Hooks ─────────────────────────────────────────────────────
export { useScrollProgress, useScrollReveal } from './hooks/useScrollProgress';
export { useSmoothScroll } from './hooks/useSmoothScroll';
export { useLazyMedia } from './hooks/useLazyMedia';

// ─── Data & Timeline Utilities ──────────────────────────────────────────────
export {
  SCENE_TIMELINE,
  getActiveScene,
  getSceneProgress,
} from './data/sceneTimeline';
