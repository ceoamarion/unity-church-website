import React, { useState } from 'react';
import { Quote, Sparkles, ArrowLeft, ArrowRight, UserCheck, MapPin } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "Youth Fellow → Lead Robotics Mentor",
    location: "South Ward Community Lab",
    headline: "From seeking direction to teaching the next generation of engineers.",
    story: "Marcus joined the Youth Leadership Lab at age 16 when he had few technical avenues available. Through three years of hands-on guidance and coding labs, he not only earned a full college scholarship but returned to teach 45 neighborhood middle schoolers robotics and software fundamentals.",
    quote: "U Impact wasn't just a place to hang out; it gave me the tangible tools to reshape what was possible for my entire family.",
    stat: "45 Youth Mentored by Marcus",
    year: "2024 - 2026",
    tag: "Youth Leadership"
  },
  {
    id: 2,
    name: "Elena Rodriguez & Neighborhood Coalition",
    role: "Community Garden & Sustenance Organizer",
    location: "Oakridge Food Hub",
    headline: "Transforming 2 vacant city lots into 42,000 lbs of fresh food per season.",
    story: "Elena worked with our Rapid Mobilization team to clear two neglected urban parcels. In 18 months, with the help of 200 volunteer build days, they installed raised beds, rainwater harvesting, and cold-storage distribution that now feeds over 350 families weekly with dignity.",
    quote: "When people come together around soil and food, the entire social fabric of a block heals.",
    stat: "350 Families Nourished Weekly",
    year: "2025 - 2026",
    tag: "Food Sovereignty"
  },
  {
    id: 3,
    name: "Darnell & Sarah Jenkins",
    role: "Dignity Housing Graduates",
    location: "Hope Haven Residences",
    headline: "Rebuilding security after unexpected crisis.",
    story: "After an unexpected family health crisis caused housing insecurity, the Jenkins family entered the Dignity Housing initiative. Within 14 months of holistic financial coaching, transitional placement, and career navigation, they successfully transitioned into permanent homeownership.",
    quote: "Having people believe in us during our darkest month gave us the strength to keep fighting for our children's future.",
    stat: "100% Debt-Free Homeowners",
    year: "2025",
    tag: "Dignity Housing"
  }
];

export default function StoriesSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const current = STORIES[activeStoryIndex];

  const handlePrev = () => {
    setActiveStoryIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="stories" style={{ padding: '7rem 0', background: 'var(--bg-dark)', position: 'relative' }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
          <div>
            <div className="scene-badge" style={{ marginBottom: '1.25rem' }}>
              <Quote size={14} className="text-accent-gold" />
              <span className="badge-text">STORIES OF IMPACT</span>
            </div>
            <h2 className="font-display text-gradient-gold" style={{ fontSize: 'var(--text-h1)', fontWeight: 800, lineHeight: 1.1 }}>
              Human lives at the center <br />of every statistic.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrev}
              className="glass-panel"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                border: '1px solid var(--border-glass-bright)',
                transition: 'all 0.3s ease'
              }}
              aria-label="Previous Story"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="glass-panel"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                border: '1px solid var(--border-gold)',
                background: 'rgba(229, 169, 104, 0.15)',
                transition: 'all 0.3s ease'
              }}
              aria-label="Next Story"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Story Spotlight Card */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 4rem)',
          border: '1px solid var(--border-glass-bright)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span className="font-editorial" style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  background: 'rgba(229, 169, 104, 0.12)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border-gold)'
                }}>
                  {current.tag}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <MapPin size={14} /> {current.location}
                </span>
              </div>

              <h3 className="font-display" style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}>
                "{current.headline}"
              </h3>

              <p className="font-sans" style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}>
                {current.story}
              </p>

              <div style={{
                borderLeft: '2px solid var(--accent-gold)',
                paddingLeft: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--accent-gold-light)',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-accent)',
                lineHeight: 1.5
              }}>
                "{current.quote}"
              </div>
            </div>

            {/* Right Profile & Outcome */}
            <div style={{
              background: 'rgba(5, 6, 8, 0.6)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.5rem'
            }}>
              <div>
                <div className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Focus Individual / Team</div>
                <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{current.name}</div>
                <div className="font-editorial" style={{ fontSize: '0.875rem', color: 'var(--accent-gold)' }}>{current.role}</div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'var(--border-glass)' }} />

              <div>
                <div className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Key Transformation Metric</div>
                <div className="font-display text-gradient-gold" style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>{current.stat}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span className="font-editorial" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Initiative Timeline:</span>
                <span className="font-editorial" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{current.year}</span>
              </div>
            </div>
          </div>

          {/* Stepper Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            {STORIES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStoryIndex(idx)}
                style={{
                  width: idx === activeStoryIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  background: idx === activeStoryIndex ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Jump to Story ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
