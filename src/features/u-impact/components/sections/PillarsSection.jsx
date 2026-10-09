import React, { useState } from 'react';
import { Sparkles, Users, Baby, Gift, Activity, Heart, ArrowUpRight } from 'lucide-react';

import { IMPACT_PROGRAMS } from '../../../../data/impactPrograms';

const icons = [Users, Baby, Gift, Sparkles, Activity, Heart];
const PILLARS_DATA = IMPACT_PROGRAMS.map((program, index) => ({ ...program, icon: icons[index] }));

export default function PillarsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(PILLARS_DATA.map(p => p.category))];

  const filteredPillars = activeFilter === 'All' 
    ? PILLARS_DATA 
    : PILLARS_DATA.filter(p => p.category === activeFilter);

  return (
    <section id="pillars" className="pillars-section" style={{ position: 'relative', padding: '8rem 0 6rem', background: 'var(--bg-deep)' }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="scene-badge" style={{ marginBottom: '1.25rem' }}>
            <Sparkles size={14} className="text-accent-gold" />
            <span className="badge-text">OUR ACTIVE INITIATIVES</span>
          </div>
          <h2 className="font-display text-gradient-gold" style={{ fontSize: 'var(--text-h1)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Where intention transforms into lasting community impact.
          </h2>
          <p className="font-sans" style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Unity Impact is the community outreach ministry of Unity Christian Church in Alcolu, South Carolina. Explore our free youth summer camp, family celebrations, Christmas support, and opportunities to give and serve.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
              className="font-editorial"
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--accent-gold)' : 'var(--border-glass)',
                background: activeFilter === cat ? 'rgba(229, 169, 104, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: activeFilter === cat ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: '1.75rem',
          marginBottom: '1rem'
        }}>
          {filteredPillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className="glass-panel glass-panel-hover"
                style={{
                  borderRadius: '20px',
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-glass)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pillar.color
                    }}>
                      <IconComp size={24} />
                    </div>
                    <span className="font-editorial" style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border-glass)'
                    }}>
                      {pillar.category}
                    </span>
                  </div>

                  <h3 className="font-display" style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    marginBottom: '0.85rem'
                  }}>
                    {pillar.title}
                  </h3>

                  <p className="font-sans" style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem'
                  }}>
                    {pillar.desc}
                  </p>
                </div>

                {/* Tags & Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {pillar.tags.map((t) => (
                      <span key={t} style={{
                        fontSize: '0.6875rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px'
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://unitycc.breezechms.com/give/online"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-gold)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-editorial)',
                      fontWeight: 700,
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    GET INVOLVED <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
