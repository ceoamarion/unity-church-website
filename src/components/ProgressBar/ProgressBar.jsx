import './ProgressBar.css';

/**
 * ProgressBar — thin elegant progress bar during construction sequence.
 * Shows construction completion percentage.
 * 
 * @param {Object} props
 * @param {number} props.progress - 0 to 1 progress value
 * @param {boolean} props.isVisible - whether to show the bar
 */
export default function ProgressBar({ progress = 0, isVisible = false }) {
  const percentage = Math.round(progress * 100);

  return (
    <div className={`progress-bar ${isVisible ? 'progress-bar--visible' : ''}`}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <span className="progress-bar__label">{percentage}% Complete</span>
    </div>
  );
}
