/**
 * U Impact — Feature Module Barrel Export
 * 
 * This module contains the building/space-exploration experience
 * originally developed for the Unity Christian Church website.
 * It has been separated so it can be reused in the future U Impact website.
 * 
 * Usage (future U Impact site):
 *   import { InteriorShowcase, Construction, Transition, Hero } from '../features/u-impact';
 *   import { CinematicScrollExperience, SCENE_TIMELINE } from '../features/u-impact';
 *   import { ConstructionPreview } from '../features/u-impact';
 */

// ─── Sections ────────────────────────────────────────────────
export { default as InteriorShowcase } from './sections/InteriorShowcase/InteriorShowcase';
export { default as Construction } from './sections/Construction/Construction';
export { default as Transition } from './sections/Transition/Transition';
export { default as Hero } from './sections/Hero/Hero';

// ─── Cinematic Engine ────────────────────────────────────────
export {
  CinematicScrollExperience,
  ScrollScene,
  MediaCanvas,
  VideoRenderer,
  ImageRenderer,
  TextReveal,
  ProgressBar,
  ScrollIndicator,
  SCENE_TIMELINE,
  getActiveScene,
  getSceneProgress,
} from './components/cinematic';

// ─── Pages ───────────────────────────────────────────────────
export { default as ConstructionPreview } from './pages/ConstructionPreview';

// ─── Hooks ───────────────────────────────────────────────────
export { useScrollProgress, useScrollReveal } from './hooks/useScrollProgress';
