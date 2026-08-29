import React from 'react';
import { ArrowUp, Sparkles, HeartHandshake, Compass, Globe, Mail, ShieldCheck } from 'lucide-react';

export default function Footer({ onGetInvolvedClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#030405', borderTop: '1px solid var(--border-glass)', padding: '6rem 0 3rem', position: 'relative' }}>
      <div className="site-container">
        
        {/* Manifesto / Banner Block */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 4rem)',
          border: '1px solid var(--border-gold)',
          marginBottom: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
          background: 'radial-gradient(circle at 50% 0%, rgba(229, 169, 104, 0.12), rgba(5, 6, 8, 0.9) 70%)'
        }}>
          <div className="scene-badge">
            <Sparkles size={14} className="text-accent-gold" />
            <span className="badge-text">THE U IMPACT MANIFESTO</span>
          </div>

          <h2 className="font-display text-gradient-gold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, maxWidth: '850px', lineHeight: 1.15 }}>
            "One action creates many people. <br />Many people create lasting change."
          </h2>

          <p className="font-sans" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.6 }}>
            U Impact is an independent, forward-thinking social impact platform dedicated to empowering grassroots leaders, neighborhoods, youth, and communities to build flourishing futures together.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            <button className="btn-primary" onClick={onGetInvolvedClick}>
              <HeartHandshake size={18} />
              JOIN AS A CHANGEMAKER
            </button>
            <button className="btn-secondary" onClick={scrollToTop}>
              <ArrowUp size={18} />
              BACK TO THE BEGINNING
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="nav-brand-orb pulse-gold"></span>
              <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>U IMPACT</span>
            </div>
            <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
              Transformative community initiatives, youth empowerment, food sovereignty, and physical gathering spaces.
            </p>
          </div>

          {/* Pillars */}
          <div>
            <h4 className="font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold-light)', marginBottom: '1.25rem' }}>
              Pillars & Focus
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="#pillars" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Youth STEM & Leadership</a>
              <a href="#pillars" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Food Sovereignty & Pantries</a>
              <a href="#pillars" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Dignity Housing Initiatives</a>
              <a href="#pillars" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Civic Gathering Spaces</a>
              <a href="#pillars" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Rapid Volunteer Squads</a>
            </div>
          </div>

          {/* Exploration */}
          <div>
            <h4 className="font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold-light)', marginBottom: '1.25rem' }}>
              Explore Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="#cinematic-intro" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>01 / The Beginning (3D)</a>
              <a href="#stories" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Stories of Transformation</a>
              <a href="#construction" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Physical Spaces Showcase</a>
              <a href="#upcoming" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>Upcoming Activations & RSVP</a>
            </div>
          </div>

          {/* Newsletter / Stay Connected */}
          <div>
            <h4 className="font-editorial" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-gold-light)', marginBottom: '1.25rem' }}>
              Impact Dispatch
            </h4>
            <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Receive monthly dispatches highlighting community outcomes and new volunteer opportunities.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter email..."
                style={{
                  flex: 1,
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass-bright)',
                  color: '#ffffff',
                  fontSize: '0.8125rem'
                }}
              />
              <button className="btn-primary" style={{ padding: '0.65rem 1rem', fontSize: '0.6875rem' }}>
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} U IMPACT. All rights reserved. A modern social impact platform.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Autonomous Social Impact Network</span>
            <span className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--accent-gold-light)' }}>One Impact Becomes Many</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
