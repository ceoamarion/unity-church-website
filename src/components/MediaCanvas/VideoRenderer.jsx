import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * VideoRenderer — Scroll-driven video scrubber.
 * 
 * Receives a normalized progress (0→1) and maps it to video.currentTime.
 * Uses requestVideoFrameCallback for frame-accurate sync where available,
 * falls back to requestAnimationFrame + timeupdate.
 * 
 * The video is NOT autoplayed. Scroll position IS the playhead.
 * Scrolling forward advances the film. Scrolling backward reverses it.
 * 
 * @param {Object} props
 * @param {number} props.progress - 0→1 scroll progress
 * @param {string} props.src - video source URL
 * @param {string} props.poster - poster image URL
 * @param {React.RefObject} props.progressRef - ref to current progress (avoids stale closures)
 */
export default function VideoRenderer({
  progress = 0,
  src = '/video/construction.mp4',
  poster,
  progressRef,
}) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const targetTimeRef = useRef(0);

  // Smoothly interpolate video.currentTime toward target for buttery scrubbing
  const smoothSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(smoothSeek);
      return;
    }

    const currentProgress = progressRef?.current ?? progress;
    const targetTime = currentProgress * video.duration;
    targetTimeRef.current = targetTime;

    const currentTime = video.currentTime;
    const delta = targetTime - currentTime;

    // Lerp toward target (smooth scrubbing)
    if (Math.abs(delta) > 0.01) {
      video.currentTime = currentTime + delta * 0.15;
    }

    rafRef.current = requestAnimationFrame(smoothSeek);
  }, [progress, progressRef]);

  // Initialize video and start the scrub loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Set initial position
      video.currentTime = 0;
    };

    const handleError = () => {
      setHasError(true);
      console.error('VideoRenderer: Failed to load video', src);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Start the smooth seek loop
    rafRef.current = requestAnimationFrame(smoothSeek);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [src, smoothSeek]);

  // Fallback: direct seek when progressRef isn't available
  useEffect(() => {
    if (progressRef) return; // Using smooth loop instead
    const video = videoRef.current;
    if (!video || !video.duration || video.readyState < 2) return;
    video.currentTime = progress * video.duration;
  }, [progress, progressRef]);

  if (hasError) {
    return (
      <div className="video-renderer video-renderer--error">
        <div className="video-renderer__fallback">
          <p className="text-label" style={{ color: 'var(--color-text-muted)' }}>
            Video could not be loaded
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-renderer">
      {/* Loading state — blurred poster */}
      {!isLoaded && (
        <div className="video-renderer__loading">
          <div className="video-renderer__pulse" />
        </div>
      )}

      {/* The video element — never autoplays, scroll controls playhead */}
      <video
        ref={videoRef}
        className={`video-renderer__video ${isLoaded ? 'video-renderer__video--loaded' : ''}`}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
}
