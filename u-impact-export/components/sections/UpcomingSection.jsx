import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: { month: "SEP", day: "12", time: "9:00 AM - 1:00 PM" },
    title: "Youth STEM & Robotics Hackathon 2026",
    location: "South Ward Community Lab",
    description: "Hands-on robotics prototyping and coding sprint for middle and high school students. Industry mentors on-site.",
    spotsLeft: 18,
    category: "Youth & Future",
    isVolunteerOpportunity: true
  },
  {
    id: 2,
    date: { month: "SEP", day: "19", time: "8:00 AM - 12:00 PM" },
    title: "Autumn Harvest & Dignity Pantry Mobilization",
    location: "Oakridge Food Sanctuary",
    description: "Harvesting 6,000 lbs of seasonal produce, assembling meal care boxes, and neighborhood door-to-door distribution.",
    spotsLeft: 42,
    category: "Sustenance",
    isVolunteerOpportunity: true
  },
  {
    id: 3,
    date: { month: "OCT", day: "03", time: "6:30 PM - 9:00 PM" },
    title: "Civic Voices: Housing & Neighborhood Stability Summit",
    location: "Civic Gathering Hall",
    description: "An open town hall bringing together neighborhood residents, civic leaders, and housing advocates to shape upcoming policy.",
    spotsLeft: 85,
    category: "Civic Arts & Policy",
    isVolunteerOpportunity: false
  },
  {
    id: 4,
    date: { month: "OCT", day: "17", time: "10:00 AM - 3:00 PM" },
    title: "Urban Tree Canopy & Green Corridors Build Day",
    location: "East Riverside Corridor",
    description: "Planting 150 native shade trees and rain gardens to reduce urban heat islands and revitalize public walkways.",
    spotsLeft: 26,
    category: "Environment & Neighborhood",
    isVolunteerOpportunity: true
  }
];

export default function UpcomingSection({ onGetInvolvedClick }) {
  const [rsvpSuccessId, setRsvpSuccessId] = useState(null);

  const handleQuickRSVP = (id) => {
    setRsvpSuccessId(id);
    setTimeout(() => {
      setRsvpSuccessId(null);
    }, 4000);
  };

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
            Direct change happens through collective presence. Discover upcoming workshops, volunteer builds, and neighborhood forums.
          </p>
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="glass-panel glass-panel-hover"
              style={{
                borderRadius: '18px',
                padding: '1.75rem clamp(1.25rem, 3vw, 2.5rem)',
                display: 'grid',
                gridTemplateColumns: 'clamp(80px, 12vw, 120px) 1fr auto',
                alignItems: 'center',
                gap: '2rem'
              }}
            >
              {/* Date Box */}
              <div style={{
                background: 'rgba(229, 169, 104, 0.12)',
                border: '1px solid var(--border-gold)',
                borderRadius: '14px',
                padding: '0.85rem 0.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span className="font-editorial" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-gold-light)' }}>
                  {event.date.month}
                </span>
                <span className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {event.date.day}
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
                    color: 'var(--accent-gold)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: '1px solid var(--border-glass)'
                  }}>
                    {event.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <Clock size={13} /> {event.date.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} /> {event.location}
                  </span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {event.title}
                </h3>
                <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '700px' }}>
                  {event.description}
                </p>
              </div>

              {/* Action / RSVP */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '140px' }}>
                <span className="font-editorial" style={{ fontSize: '0.75rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                  {event.spotsLeft} spots available
                </span>

                {rsvpSuccessId === event.id ? (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-editorial)',
                    fontWeight: 700,
                    padding: '0.65rem 1.25rem'
                  }}>
                    <CheckCircle size={16} /> RSVP CONFIRMED
                  </span>
                ) : (
                  <button
                    onClick={() => handleQuickRSVP(event.id)}
                    className="btn-primary"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.75rem' }}
                  >
                    RSVP / ATTEND
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p className="font-sans" style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            Want to organize an initiative or partner with U Impact in your neighborhood?
          </p>
          <button 
            className="btn-secondary"
            onClick={onGetInvolvedClick}
          >
            PROPOSE A COMMUNITY INITIATIVE
          </button>
        </div>

      </div>
    </section>
  );
}
