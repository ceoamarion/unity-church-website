import React from 'react';
import { Quote, Sparkles, Clock } from 'lucide-react';

export default function StoriesSection() {
  return (
    <section id="stories" style={{ padding: '7rem 0', background: 'var(--bg-dark)', position: 'relative' }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="scene-badge" style={{ marginBottom: '1.25rem' }}>
            <Quote size={14} className="text-accent-gold" />
            <span className="badge-text">STORIES OF IMPACT</span>
          </div>
          <h2 className="font-display text-gradient-gold" style={{ fontSize: 'var(--text-h1)', fontWeight: 800, lineHeight: 1.1 }}>
            Stories of Change
          </h2>
        </div>

        {/* Coming Soon Showcase Panel */}
        <div className="glass-panel glow-gold" style={{
          borderRadius: '24px',
          padding: 'clamp(3.5rem, 7vw, 6rem) clamp(2rem, 5vw, 4rem)',
          border: '1px solid var(--border-gold)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          background: 'radial-gradient(circle at 50% 35%, rgba(229, 169, 104, 0.12), rgba(5, 6, 8, 0.95) 75%)'
        }}>
          {/* Coming Soon Badge */}
          <div className="scene-badge" style={{ 
            padding: '0.45rem 1.25rem', 
            background: 'rgba(229, 169, 104, 0.15)', 
            border: '1px solid var(--accent-gold)' 
          }}>
            <Sparkles size={14} className="text-accent-gold" />
            <span className="badge-text" style={{ letterSpacing: '0.2em', fontWeight: 700 }}>COMING SOON</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-gradient-gold" style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: '750px'
          }}>
            “Stories of Change”
          </h3>

          {/* Description */}
          <p className="font-sans" style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            Real stories from the people and communities impacted through U Impact will be shared here.
          </p>

          {/* Status Capsule */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '0.55rem 1.35rem',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-muted)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-editorial)'
          }}>
            <Clock size={14} className="text-accent-gold" />
            <span>Community Narratives in Production</span>
          </div>
        </div>

      </div>
    </section>
  );
}
