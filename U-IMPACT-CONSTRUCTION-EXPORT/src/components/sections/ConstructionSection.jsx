import React from 'react';
import { Building2, Sparkles, Compass, Hammer } from 'lucide-react';
import InteriorShowcase from '../../../sections/InteriorShowcase/InteriorShowcase';
import '../../../styles/tokens.css';

export default function ConstructionSection() {
  return (
    <section id="construction" style={{ position: 'relative', background: 'var(--bg-deep)', padding: '6rem 0 4rem' }}>
      <div className="site-container">
        
        {/* Intro banner for Physical Spaces */}
        <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
          <div className="scene-badge" style={{ marginBottom: '1.25rem' }}>
            <Building2 size={14} className="text-accent-gold" />
            <span className="badge-text">IMPACT IN ACTION: PHYSICAL SPACES</span>
          </div>
          <h2 className="font-display text-gradient-gold" style={{ fontSize: 'var(--text-h1)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Building the foundations <br />where community flourishes.
          </h2>
          <p className="font-sans" style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Physical spaces anchor community transformation. Explore the dedicated environments constructed to host youth learning, food distribution, wellness counseling, and civic fellowship.
          </p>
        </div>

      </div>

      {/* Render the preserved, exported Interior Showcase */}
      <div className="preserved-construction-container" style={{ position: 'relative' }}>
        <InteriorShowcase 
          headerLabel="Architectural Spaces"
          headerTitle="Built with intention. Dedicated to community."
          headerDescription="Every room, court, and gathering hall is designed to serve a distinct purpose in empowering human potential."
          id="spaces-integrated"
        />
      </div>
    </section>
  );
}
