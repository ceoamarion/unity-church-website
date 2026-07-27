import './ProgressBar.css';

/**
 * ProgressBar — Thin progress indicator at the bottom of the construction viewport.
 * Shows current scene label and a progress line.
 * 
 * @param {Object} props
 * @param {number} props.progress - 0→1 scroll progress
 * @param {boolean} props.isVisible - whether to show the bar
 * @param {Object} props.activeScene - current scene object from SCENE_TIMELINE
 */
export default function ProgressBar({ progress = 0, isVisible = false, activeScene }) {
  return (
    <div
      className={`progress-bar ${isVisible ? 'progress-bar--visible' : ''}`}
    >
      {/* Scene label */}
      <span className="progress-bar__label">
        {activeScene?.label || ''}
      </span>

      {/* Track */}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Percentage */}
      <span className="progress-bar__percent">
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}
