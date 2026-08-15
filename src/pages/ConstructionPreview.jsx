import { CinematicScrollExperience, SCENE_TIMELINE } from '../components/cinematic';

/**
 * ConstructionPreview — Development-only route for reviewing the
 * cinematic construction experience.
 * 
 * Accessible via: /#/dev/construction-preview
 * 
 * This page is NOT exposed in public navigation. It exists so the
 * construction experience can be reviewed and tested independently,
 * and will eventually become the foundation for the U Impact website.
 */
export default function ConstructionPreview() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Dev mode banner */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: 'rgba(200, 149, 108, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 600,
          color: '#fff',
        }}
      >
        <span>🎬 Construction Preview — Development Route</span>
        <a
          href="#/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '4px 12px',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '999px',
            fontSize: '12px',
            letterSpacing: '0.05em',
          }}
        >
          ← Back to Site
        </a>
      </div>

      {/* The full cinematic construction experience */}
      <CinematicScrollExperience
        scenes={SCENE_TIMELINE}
        videoSrc="/video/construction.mp4"
        height="600vh"
        scrub={0.5}
        id="construction-preview"
        scrollHintText="Begin the Journey"
        renderer="video"
      />
    </div>
  );
}
