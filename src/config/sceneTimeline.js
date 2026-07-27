/**
 * sceneTimeline.js — Single source of truth for the construction film timeline.
 * 
 * Each scene maps a scroll progress range (0→1) to video time boundaries,
 * overlay text, and visual styling. The ScrollScene component reads this
 * config to synchronize text reveals with video playback.
 * 
 * To swap media (image sequence, Three.js, WebXR), only the renderer
 * changes — this timeline stays identical.
 */

export const SCENE_TIMELINE = [
  {
    id: 'empty-land',
    phase: 1,
    label: 'The Beginning',
    title: 'Building More\nThan A Church.',
    subtitle: null,
    range: [0.00, 0.10],
    textStyle: 'hero',
  },
  {
    id: 'surveying',
    phase: 2,
    label: 'The Vision',
    title: 'A Strong\nFoundation',
    subtitle: 'Every great structure begins with a dream rooted in faith.',
    range: [0.10, 0.22],
    textStyle: 'default',
  },
  {
    id: 'foundation',
    phase: 3,
    label: 'Breaking Ground',
    title: 'Breaking\nGround',
    subtitle: 'The foundation is laid — strong, enduring, purposeful.',
    range: [0.22, 0.38],
    textStyle: 'default',
  },
  {
    id: 'steel',
    phase: 4,
    label: 'The Framework',
    title: 'Built On\nFaith',
    subtitle: 'Structure emerges from the blueprint of belief.',
    range: [0.38, 0.52],
    textStyle: 'default',
  },
  {
    id: 'exterior',
    phase: 5,
    label: 'Taking Shape',
    title: 'Designed For\nCommunity',
    subtitle: 'Walls embrace the space. Light finds its way in.',
    range: [0.52, 0.66],
    textStyle: 'default',
  },
  {
    id: 'lobby',
    phase: 6,
    label: 'Step Inside',
    title: 'Made For\nWorship',
    subtitle: 'An interior crafted for encounter and connection.',
    range: [0.66, 0.80],
    textStyle: 'default',
  },
  {
    id: 'interior',
    phase: 7,
    label: 'Coming Alive',
    title: 'Where Life\nHappens',
    subtitle: 'Every room designed with intention and love.',
    range: [0.80, 0.90],
    textStyle: 'default',
  },
  {
    id: 'final-reveal',
    phase: 8,
    label: 'Complete',
    title: 'Welcome\nHome.',
    subtitle: 'From vision to reality — built by faith, united in purpose.',
    range: [0.90, 1.00],
    textStyle: 'climax',
  },
];

/**
 * Get the active scene for a given progress value.
 * @param {number} progress - 0 to 1
 * @returns {Object|null} The active scene object or the last scene if progress >= 1
 */
export function getActiveScene(progress) {
  if (progress >= 1) return SCENE_TIMELINE[SCENE_TIMELINE.length - 1];
  return SCENE_TIMELINE.find(
    (scene) => progress >= scene.range[0] && progress < scene.range[1]
  ) || SCENE_TIMELINE[0];
}

/**
 * Calculate normalized progress within a specific scene (0→1).
 * @param {number} globalProgress - overall 0→1 progress
 * @param {Object} scene - scene object from SCENE_TIMELINE
 * @returns {number} 0→1 progress within the scene
 */
export function getSceneProgress(globalProgress, scene) {
  const span = scene.range[1] - scene.range[0];
  if (span === 0) return 0;
  return Math.max(0, Math.min(1, (globalProgress - scene.range[0]) / span));
}
