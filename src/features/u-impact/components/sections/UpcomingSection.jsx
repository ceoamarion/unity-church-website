import React from 'react';
import { Calendar, Clock, Sparkles, HeartHandshake } from 'lucide-react';

const UPCOMING_EVENTS = [
  {
    id: 1,
    isConfirmedNext: true,
    dateBox: { top: "AUG", main: "29" },
    time: "5:00 PM",
    title: "Gala",
    category: "Building Fundraiser",
    description: "An evening gathering supporting the effort to raise funds for the building.",
    statusLabel: "Confirmed Next Event"
  },
  {
    id: 2,
    isTBD: true,
    dateBox: { top: "DATE", main: "TBD" },
    title: "Community Baby Shower",
    category: "Community Support",
    description: "A community gathering dedicated to supporting local families, expectant mothers, and newborns.",
    statusLabel: "To Be Determined"
  },
  {
    id: 3,
    isTBD: true,
    dateBox: { top: "DATE", main: "TBD" },
    title: "Christmas Event",
    category: "Holiday Fellowship",
    description: "Annual community Christmas fellowship and celebration.",
    statusLabel: "To Be Determined"
  },
  {
    id: 4,
    isTBD: true,
    dateBox: { top: "DATE", main: "TBD" },
    title: "Expungement Event",
    category: "Legal Aid & Clinic",
    description: "Legal aid and expungement assistance clinic serving our community.",
    statusLabel: "To Be Determined"
  },
  {
    id: 5,
    isTBD: true,
    dateBox: { top: "DATE", main: "TBD" },
    title: "Summer Camp",
    category: "Youth Enrichment",
    description: "Youth summer enrichment, activities, and leadership development.",
    statusLabel: "To Be Determined"
  }
];

export default function UpcomingSection() {
  return (
    <section id="upcoming" style={{ padding: '7rem 0', background: 'var(--bg-dark)', position: 'relative' }}>
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="scene-badge" style={{ marginBottom: '1.25rem' }}>
            <Calendar size={14} className="text-accent-gold" />
            <span className="badge-text">JOIN THE MOVEMENT</span>
          </div>
          <h2 className="font-display text-gradient-gold" style={{ fontSize: 'var(--text-h1)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Upcoming events, drives, and activations.
          </h2>
          <p className="font-sans" style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Direct change happens through collective presence. Discover upcoming community gatherings, fundraisers, and neighborhood initiatives.
          </p>
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className={`glass-panel glass-panel-hover ${event.isConfirmedNext ? 'glow-gold' : ''}`}
              style={{
                borderRadius: '18px',
                padding: '1.75rem clamp(1.25rem, 3vw, 2.5rem)',
                display: 'grid',
                gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                border: event.isConfirmedNext ? '1px solid var(--border-gold)' : '1px solid var(--border-glass)'
              }}
            >
              {/* Date Box */}
              <div style={{
                background: event.isConfirmedNext ? 'rgba(229, 169, 104, 0.18)' : 'rgba(229, 169, 104, 0.08)',
                border: event.isConfirmedNext ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                borderRadius: '14px',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '76px'
              }}>
                <span className="font-editorial" style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.15em', 
                  color: event.isConfirmedNext ? 'var(--accent-gold)' : 'var(--text-muted)' 
                }}>
                  {event.dateBox.top}
                </span>
                <span className="font-display" style={{ 
                  fontSize: event.dateBox.main === 'TBD' ? '1.45rem' : '1.85rem', 
                  fontWeight: 800, 
                  color: 'var(--text-primary)', 
                  lineHeight: 1.1,
                  marginTop: '0.15rem'
                }}>
                  {event.dateBox.main}
                </span>
              </div>

              {/* Event Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  <span className="font-editorial" style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: event.isConfirmedNext ? 'var(--accent-gold)' : 'var(--accent-gold-light)',
                    background: event.isConfirmedNext ? 'rgba(229, 169, 104, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid var(--border-glass)'
                  }}>
                    {event.category}
                  </span>
                  
                  {event.time && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <Clock size={13} className="text-accent-gold" /> {event.time}
                    </span>
                  )}

                  {event.isTBD && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      <Calendar size={13} /> Date To Be Announced
                    </span>
                  )}
                </div>

                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {event.title}
                </h3>
                <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '700px' }}>
                  {event.description}
                </p>
              </div>

              {/* Action / Connect */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '140px' }}>
                <span className="font-editorial" style={{ 
                  fontSize: '0.75rem', 
                  color: event.isConfirmedNext ? 'var(--accent-gold-light)' : 'var(--text-muted)', 
                  fontWeight: 600 
                }}>
                  {event.statusLabel}
                </span>

                <a
                  href="https://unitycc.breezechms.com/give/online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.75rem', textDecoration: 'none' }}
                >
                  GET INVOLVED
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p className="font-sans" style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            Want to organize an initiative or partner with U Impact in your neighborhood?
          </p>
          <a 
            href="https://unitycc.breezechms.com/give/online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <HeartHandshake size={16} />
            GET INVOLVED / CONNECT
          </a>
        </div>

      </div>
    </section>
  );
}
