import React, { useState } from 'react';
import { Sparkles, Users, Utensils, Home, Palette, Activity, Heart, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const PILLARS_DATA = [
  {
    id: 'youth',
    category: 'Youth & Future',
    icon: Users,
    title: 'Youth Leadership & Creative STEM Labs',
    desc: 'Empowering the next generation with cutting-edge tech mentorship, creative media workshops, and college readiness programs.',
    stats: '420+ Scholars Mentored',
    secondaryStat: '98% Graduation Rate',
    tags: ['Education', 'Mentorship', 'Tech Access'],
    activeProjects: 6,
    color: '#e5a968'
  },
  {
    id: 'food',
    category: 'Sustenance',
    icon: Utensils,
    title: 'Community Food Sanctuary & Pantry Network',
    desc: 'Ensuring zero food insecurity across neighboring zip codes through fresh organic produce distribution and dignity-first pantries.',
    stats: '18,500+ Hot Meals Served',
    secondaryStat: '42,000 lbs Fresh Produce',
    tags: ['Food Justice', 'Nutrition', 'Direct Aid'],
    activeProjects: 4,
    color: '#6ee7b7'
  },
  {
    id: 'housing',
    category: 'Housing & Shelter',
    icon: Home,
    title: 'Dignity Housing & Transitional Support',
    desc: 'Providing immediate shelter assistance, transitional home placement, and long-term economic stabilizing pathways for families.',
    stats: '48 Families Housed',
    secondaryStat: '94% Retention in Stable Living',
    tags: ['Housing', 'Family Stability', 'Advocacy'],
    activeProjects: 3,
    color: '#93c5fd'
  },
  {
    id: 'civic',
    category: 'Civic Arts',
    icon: Palette,
    title: 'Civic Gathering Halls & Community Arts',
    desc: 'Creating open public spaces where neighborhood voices converge, creative expression thrives, and civic bonds are forged.',
    stats: '120+ Community Events',
    secondaryStat: '8,400+ Gathering Attendees',
    tags: ['Culture', 'Public Space', 'Community Voice'],
    activeProjects: 5,
    color: '#f472b6'
  },
  {
    id: 'health',
    category: 'Health & Wellness',
    icon: Activity,
    title: 'Mental Health & Holistic Wellness Outreach',
    desc: 'Destigmatizing wellness with free licensed counseling, elder care check-ins, and peer-led grief and trauma recovery circles.',
    stats: '3,100 Support Sessions',
    secondaryStat: '850+ Seniors Connected',
    tags: ['Mental Health', 'Elder Care', 'Holistic Care'],
    activeProjects: 4,
    color: '#fbbf24'
  },
  {
    id: 'volunteer',
    category: 'Rapid Mobilization',
    icon: Heart,
    title: 'Rapid Volunteer Squad & Mutual Aid',
    desc: 'A ready-to-deploy network of volunteers responding to neighborhood emergency needs, severe weather, and neighborhood cleanups.',
    stats: '1,400 Active Volunteers',
    secondaryStat: '< 2 Hour Crisis Response',
    tags: ['Mutual Aid', 'Volunteering', 'Disaster Relief'],
    activeProjects: 8,
    color: '#a78bfa'
  }
];

export default function PillarsSection({ onGetInvolvedClick }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Youth & Future', 'Sustenance', 'Housing & Shelter', 'Civic Arts', 'Health & Wellness'];

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
            Where intention transforms into measurable impact.
          </h2>
          <p className="font-sans" style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Explore our foundational pillars of community transformation. Every initiative is built collaboratively with the people it serves.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.75rem',
          marginBottom: '5rem'
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
                    marginBottom: '1.5rem'
                  }}>
                    {pillar.desc}
                  </p>
                </div>

                {/* Metrics & Tags */}
                <div>
                  <div style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'rgba(5, 6, 8, 0.5)',
                    border: '1px solid var(--border-glass)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-editorial" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Key Outcome</span>
                      <span className="font-editorial" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-gold-light)' }}>{pillar.stats}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-editorial" style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reach</span>
                      <span className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{pillar.secondaryStat}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

                    <button
                      onClick={onGetInvolvedClick}
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
                        cursor: 'pointer'
                      }}
                    >
                      SUPPORT <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Impact Metric Banner */}
        <div className="glass-panel glow-gold" style={{
          borderRadius: '24px',
          padding: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          border: '1px solid var(--border-gold)'
        }}>
          <div>
            <div className="font-display text-gradient-gold" style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>14,200+</div>
            <div className="font-editorial" style={{ fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Direct Lives Touched</div>
          </div>
          <div>
            <div className="font-display text-gradient-gold" style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>85+</div>
            <div className="font-editorial" style={{ fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Active Initiatives</div>
          </div>
          <div>
            <div className="font-display text-gradient-gold" style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>$2.4M</div>
            <div className="font-editorial" style={{ fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Community Value Generated</div>
          </div>
          <div>
            <div className="font-display text-gradient-gold" style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1 }}>1,400+</div>
            <div className="font-editorial" style={{ fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Mobilized Volunteers</div>
          </div>
        </div>

      </div>
    </section>
  );
}
