/**
 * ============================================================================
 * U-IMPACT MASTER EXPORT & COMPONENT SUITE
 * ============================================================================
 * 
 * Standalone, portable React experience for 3D WebGL particle visualization,
 * cinematic video-scrubbing scroll runways, interactive community initiatives,
 * architectural spaces showcase, and pledge workflows.
 * 
 * QUICK START:
 *   import { UImpactApp, ImpactIntro, CinematicScrollExperience } from './u-impact-export';
 *   import './u-impact-export/styles/index.css';
 *   import './u-impact-export/styles/tokens.css';
 */

// ─── Turnkey Standalone App & Experience ────────────────────────────────────
export { default as UImpactApp, default as UImpactExperience } from './App';

// ─── 3D WebGL & Master Hero Experience ("One Impact Becomes Many") ──────────
export { default as ImpactIntro } from './components/intro/ImpactIntro';
export { default as ImpactCanvas } from './components/intro/ImpactCanvas';
export { default as ImpactHUD } from './components/intro/ImpactHUD';
export { default as ImpactOverlay } from './components/intro/ImpactOverlay';
export { default as ImpactVideoScrubber } from './components/intro/ImpactVideoScrubber';
export { ImpactSceneManager } from './components/intro/ImpactSceneManager';
export { impactAudio } from './components/intro/ImpactAudio';

// ─── Navigation ─────────────────────────────────────────────────────────────
export { default as Navbar } from './components/navigation/Navbar';

// ─── Story & Community Impact Sections ──────────────────────────────────────
export { default as PillarsSection } from './components/sections/PillarsSection';
export { default as StoriesSection } from './components/sections/StoriesSection';
export { default as ConstructionSection } from './components/sections/ConstructionSection';
export { default as UpcomingSection } from './components/sections/UpcomingSection';
export { default as Footer } from './components/sections/Footer';
export { default as GetInvolvedModal } from './components/sections/GetInvolvedModal';

// ─── Cinematic Scroll Engine & Video Scrubber Components ────────────────────
export { default as CinematicScrollExperience } from './components/construction/CinematicScrollExperience/CinematicScrollExperience';
export { default as ScrollScene } from './components/construction/ScrollScene/ScrollScene';
export { default as MediaCanvas } from './components/construction/MediaCanvas/MediaCanvas';
export { default as VideoRenderer } from './components/construction/MediaCanvas/VideoRenderer';
export { default as ImageRenderer } from './components/construction/MediaCanvas/ImageRenderer';
export { default as TextReveal } from './components/construction/TextReveal/TextReveal';
export { default as ProgressBar } from './components/construction/ProgressBar/ProgressBar';
export { default as ScrollIndicator } from './components/construction/ScrollIndicator/ScrollIndicator';
export { default as FadeSection } from './components/construction/FadeSection/FadeSection';
export { default as ParallaxImage } from './components/construction/ParallaxImage/ParallaxImage';

// ─── Architectural Spaces Sections ──────────────────────────────────────────
export { default as Hero } from './components/spaces/Hero/Hero';
export { default as Construction } from './components/spaces/Construction/Construction';
export { default as Transition } from './components/spaces/Transition/Transition';
export { default as InteriorShowcase, DEFAULT_SPACES } from './components/spaces/InteriorShowcase/InteriorShowcase';

// ─── Custom React Hooks ─────────────────────────────────────────────────────
export { useLenis } from './hooks/useLenis';
export { useScrollProgress, useScrollReveal } from './hooks/useScrollProgress';
export { useSmoothScroll } from './hooks/useSmoothScroll';
export { useLazyMedia } from './hooks/useLazyMedia';

// ─── Data & Timeline Utilities ──────────────────────────────────────────────
export {
  SCENE_TIMELINE,
  getActiveScene,
  getSceneProgress,
} from './data/sceneTimeline';
