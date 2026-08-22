import { CinematicScrollExperience, SCENE_TIMELINE } from '../index';

/**
 * ConstructionPreview — Standalone preview page for the
 * cinematic scroll-driven construction experience.
 * 
 * Demonstrates how to mount and test the experience in a full-page view.
 * 
 * @param {Object} props
 * @param {string} props.videoSrc - URL to the construction video (default: "/video/construction.mp4")
 * @param {Array} props.scenes - Timeline configuration (default: SCENE_TIMELINE)
 */
export default function ConstructionPreview({
  videoSrc = '/video/construction.mp4',
  scenes = SCENE_TIMELINE,
}) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* The full cinematic construction experience */}
      <CinematicScrollExperience
        scenes={scenes}
        videoSrc={videoSrc}
        height="600vh"
        scrub={0.5}
        id="construction-experience"
        scrollHintText="Begin the Journey"
        renderer="video"
      />
    </div>
  );
}
