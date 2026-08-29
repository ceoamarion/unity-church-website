import React, { useState } from 'react';
import { Quote, Sparkles, ArrowLeft, ArrowRight, UserCheck, MapPin } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: "Marcus Thorne",
    role: "Youth Fellow & Robotics Mentor",
    location: "South Ward Community Lab",
    headline: "From seeking direction to mentoring the next generation.",
    story: "Marcus joined the Youth Leadership Lab when seeking constructive technical opportunities. Through dedicated hands-on guidance and coding workshops, he developed key engineering skills and returned as a mentor to teach neighborhood youth robotics and software fundamentals.",
    quote: "U Impact wasn't just a place to hang out; it gave me the tangible tools to reshape what was possible for my entire family.",
    communityImpact: "Youth Leadership & Mentorship",
    year: "Active Fellow",
    tag: "Youth Leadership"
  },
  {
    id: 2,
    name: "Elena Rodriguez & Neighborhood Coalition",
    role: "Community Garden & Sustenance Organizer",
    location: "Oakridge Food Hub",
    headline: "Transforming vacant lots into vibrant community gardens.",
    story: "Elena collaborated with our community mobilization team to revitalize neglected urban parcels. Together with dedicated neighborhood volunteers, they created raised beds, rainwater harvesting, and cold-storage distribution that nourishes local families with dignity.",
    quote: "When people come together around soil and food, the entire social fabric of a block heals.",
    communityImpact: "Food Sovereignty & Shared Harvest",
    year: "Community Initiative",
    tag: "Food Sovereignty"
  },
  {
    id: 3,
    name: "Darnell & Sarah Jenkins",
    role: "Dignity Housing Graduates",
    location: "Hope Haven Residences",
    headline: "Rebuilding security and hope after unexpected crisis.",
    story: "After an unexpected family crisis caused housing vulnerability, the Jenkins family connected with the Dignity Housing initiative. Through supportive financial coaching, transitional placement, and career navigation, they successfully transitioned into permanent homeownership.",
    quote: "Having people believe in us during our darkest month gave us the strength to keep fighting for our children's future.",
    communityImpact: "Family Housing & Long-term Stability",
    year: "Program Graduate",
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
              Human lives at the center <br />of community transformation.
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

            {/* Right Profile & Community Context */}
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
                <div className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Focus Individual / Community</div>
                <div className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{current.name}</div>
                <div className="font-editorial" style={{ fontSize: '0.875rem', color: 'var(--accent-gold)' }}>{current.role}</div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'var(--border-glass)' }} />

              <div>
                <div className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Impact Focus</div>
                <div className="font-display text-gradient-gold" style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>{current.communityImpact}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span className="font-editorial" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Community Role:</span>
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
