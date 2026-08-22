import React from 'react';
import { Volume2, VolumeX, Eye, Sparkles, MapPin, Layers } from 'lucide-react';
import { impactAudio } from './ImpactAudio';

export default function ImpactHUD({ 
  progress, 
  onJumpToProgress, 
  hoveredNode, 
  isAudioActive, 
  setIsAudioActive,
  isReducedMotion,
  setIsReducedMotion 
}) {
  const scenes = [
    { id: 1, label: "The Spark", range: 0.00 },
    { id: 2, label: "Approach", range: 0.25 },
    { id: 3, label: "Impact", range: 0.60 },
    { id: 4, label: "Network", range: 0.78 },
    { id: 5, label: "U Impact", range: 0.95 },
  ];

  const handleAudioToggle = () => {
    const newState = impactAudio.toggleAudio();
    setIsAudioActive(newState);
  };

  const getActiveSceneIndex = () => {
    if (progress < 0.18) return 0;
    if (progress < 0.45) return 1;
    if (progress < 0.72) return 2;
    if (progress < 0.88) return 3;
    return 4;
  };

  const activeIdx = getActiveSceneIndex();

  return (
    <div className="impact-hud-layer">
      {/* Top Left: Cinematic Timeline Stepper */}
      <div className="hud-timeline-bar glass-panel">
        <div className="timeline-stepper">
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              className={`timeline-step-btn ${idx === activeIdx ? 'active' : ''} ${idx < activeIdx ? 'passed' : ''}`}
              onClick={() => onJumpToProgress(s.range)}
              title={`Jump to Scene ${s.id}: ${s.label}`}
            >
              <span className="step-num">0{s.id}</span>
              <span className="step-label font-editorial">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Right: Sound & Accessibility Controls */}
      <div className="hud-controls-group">
        <button 
          className={`hud-control-btn glass-panel ${isAudioActive ? 'active-audio' : ''}`}
          onClick={handleAudioToggle}
          title={isAudioActive ? "Mute Atmospheric Soundscape" : "Enable Atmospheric Soundscape"}
          aria-label="Toggle Soundscape"
        >
          {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span className="hud-btn-text font-editorial">
            {isAudioActive ? "SOUND ON" : "AUDIO"}
          </span>
          {isAudioActive && (
            <span className="sound-wave-bars">
              <span></span><span></span><span></span>
            </span>
          )}
        </button>

        <button 
          className={`hud-control-btn glass-panel ${isReducedMotion ? 'active-motion' : ''}`}
          onClick={() => setIsReducedMotion(!isReducedMotion)}
          title="Toggle Reduced Motion"
          aria-label="Toggle Reduced Motion"
        >
          <Eye size={16} />
          <span className="hud-btn-text font-editorial">
            {isReducedMotion ? "STATIC" : "3D MOTION"}
          </span>
        </button>
      </div>

      {/* Bottom Center / Left: Interactive Node Inspection Tooltip (Active when hovering in 3D) */}
      {hoveredNode && (
        <div className="hud-node-tooltip glass-panel glow-gold animate-fade-in">
          <div className="node-tooltip-header">
            <span className="node-badge font-editorial">{hoveredNode.category}</span>
            <span className="node-icon"><Sparkles size={14} /></span>
          </div>
          <h4 className="node-title font-display">{hoveredNode.name}</h4>
          <div className="node-impact-stat">
            <span className="stat-label">Impact Metric:</span>
            <span className="stat-val text-gradient-gold">{hoveredNode.impact}</span>
          </div>
        </div>
      )}

      {/* Bottom Right: Real-time Progress Gauge */}
      <div className="hud-progress-gauge glass-panel font-editorial">
        <div className="gauge-track">
          <div 
            className="gauge-fill"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="gauge-text">
          <span className="gauge-label">EXPERIENCE PROGRESS</span>
          <span className="gauge-value">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
