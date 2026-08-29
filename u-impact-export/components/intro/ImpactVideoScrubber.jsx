import React, { useRef, useEffect, useState } from 'react';

/**
 * Master Scene Video Scrubber — Canvas-Pipeline Edition
 *
 * Why canvas?  Setting video.currentTime every RAF frame forces the browser
 * to seek from the nearest keyframe each tick.  Compressed H.264 videos
 * have keyframes every 1-4 seconds, so *every* seek decodes potentially
 * dozens of intermediate frames → visible stutter.
 *
 * Solution:
 *   1. The <video> element is hidden (off-screen, no layout).
 *   2. A <canvas> covers the viewport and always retains the last
 *      successfully decoded frame, so the user never sees a blank.
 *   3. We only issue a new seek when video.seeking === false (previous
 *      seek finished) — no decoder pile-up.
 *   4. requestVideoFrameCallback (where supported) tells us the instant
 *      a new decoded frame is ready; we blit it to the canvas then.
 *   5. Fallback: on browsers without RVFC we use 'seeked' events +
 *      a RAF draw loop.
 */
export const FULL_SCENE_CONFIG = {
  src: '/videos/full-scene.mp4',
  scenes: [
    { id: 'scene-1', name: 'The Spark & Dark Clouds', range: [0.00, 0.22] },
    { id: 'scene-2', name: 'Light Breaking Clouds', range: [0.22, 0.46] },
    { id: 'scene-3', name: 'Campus Discovery', range: [0.46, 0.70] },
    { id: 'scene-4', name: 'Light Spreading in People', range: [0.70, 0.90] },
    { id: 'scene-5', name: 'U Impact Reveal', range: [0.90, 1.00] },
  ]
};

export default function ImpactVideoScrubber({ progress = 0, isReducedMotion = false }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const ctxRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const durationRef = useRef(0);
  const progressRef = useRef(progress);
  const pendingSeekRef = useRef(false);
  const lastDrawnTimeRef = useRef(-1);
  const rafRef = useRef(null);
  const rvfcIdRef = useRef(null);
  const hasRVFC = useRef(typeof HTMLVideoElement !== 'undefined' &&
    'requestVideoFrameCallback' in HTMLVideoElement.prototype);

  // Keep a ref-copy of progress so the RAF / RVFC callbacks always
  // read the latest value without re-subscribing.
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // ── Draw a video frame onto the canvas ─────────────────────────
  const drawFrame = () => {
    const video = videoRef.current;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!video || !ctx || !canvas) return;
    if (video.readyState < 2) return; // not enough data yet

    // Only redraw if the playhead actually moved
    if (video.currentTime === lastDrawnTimeRef.current) return;
    lastDrawnTimeRef.current = video.currentTime;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  // ── Issue the next seek (throttled — waits for previous to finish) ─
  const issueSeek = () => {
    const video = videoRef.current;
    if (!video || durationRef.current <= 0) return;
    if (video.seeking) {
      // Previous seek is still in flight — flag that we need another one
      pendingSeekRef.current = true;
      return;
    }

    const p = Math.max(0, Math.min(1, progressRef.current));
    const target = Math.min(durationRef.current - 0.05, Math.max(0.001, p * durationRef.current));

    // Skip if we're already close enough (< 1 frame at 30fps ≈ 0.033s)
    if (Math.abs(video.currentTime - target) < 0.025) return;

    if (video.fastSeek) {
      video.fastSeek(target);
    } else {
      video.currentTime = target;
    }
  };

  // ── On 'seeked': draw frame + issue queued seek ────────────────
  const onSeeked = () => {
    drawFrame();
    if (pendingSeekRef.current) {
      pendingSeekRef.current = false;
      issueSeek();
    }
  };

  // ── requestVideoFrameCallback loop (Chrome / Edge) ─────────────
  const rvfcLoop = () => {
    drawFrame();
    rvfcIdRef.current = videoRef.current?.requestVideoFrameCallback(rvfcLoop);
  };

  // ── Fallback RAF loop (Firefox / Safari without RVFC) ──────────
  const rafLoop = () => {
    drawFrame();
    rafRef.current = requestAnimationFrame(rafLoop);
  };

  // ── Seek driver: runs every RAF to detect when we need a new seek ─
  useEffect(() => {
    let seekRaf;
    const driveSeeks = () => {
      issueSeek();
      seekRaf = requestAnimationFrame(driveSeeks);
    };
    seekRaf = requestAnimationFrame(driveSeeks);
    return () => cancelAnimationFrame(seekRaf);
  });

  // ── Bootstrap: create video, canvas context, event wiring ──────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create offscreen video element (never added to layout)
    const video = document.createElement('video');
    video.src = FULL_SCENE_CONFIG.src;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.style.position = 'absolute';
    video.style.width = '0';
    video.style.height = '0';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    // Must be in the DOM for some browsers to decode
    document.body.appendChild(video);
    videoRef.current = video;

    // Canvas 2D context
    ctxRef.current = canvas.getContext('2d', { alpha: false, desynchronized: true });

    // Sizing helper
    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    };

    const onLoadedMetadata = () => {
      const dur = video.duration;
      if (dur && isFinite(dur)) {
        durationRef.current = dur;
      }
      syncSize();
      video.currentTime = 0.001;
    };

    const onCanPlay = () => {
      setIsReady(true);
      drawFrame();
      // Start frame-draw loops
      if (hasRVFC.current) {
        rvfcIdRef.current = video.requestVideoFrameCallback(rvfcLoop);
      } else {
        rafRef.current = requestAnimationFrame(rafLoop);
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('seeked', onSeeked);

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
      drawFrame();
    });
    resizeObserver.observe(canvas);

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('seeked', onSeeked);
      resizeObserver.disconnect();

      if (hasRVFC.current && rvfcIdRef.current != null) {
        video.cancelVideoFrameCallback(rvfcIdRef.current);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      video.pause();
      video.removeAttribute('src');
      video.load();
      document.body.removeChild(video);
      videoRef.current = null;
    };
  }, []); // mount once

  // Subtle cinematic depth scaling as the camera traverses the universe
  const scale = 1 + progress * 0.035;

  return (
    <div className="impact-video-scrubber-layer">
      <div
        className="impact-video-track impact-video-track--master"
        style={{
          opacity: isReady ? 1 : 0,
          transform: `scale(${scale})`,
          transition: 'opacity 0.6s ease-out, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="impact-video-element"
          style={{ imageRendering: 'auto' }}
          aria-hidden="true"
        />
      </div>

      {/* Atmospheric Cinematic Color Grading & Depth Overlays */}
      <div className="impact-cinematic-grading" />
    </div>
  );
}
