import { useState, useEffect } from 'react';
import { TEAM_MEMBERS, TEAM_CATEGORIES } from '../../data/teamData';
import './TeamModal.css';

export default function TeamModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setActiveCategory('All');
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMembers = activeCategory === 'All'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.category === activeCategory);

  return (
    <div className="team-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
      <div className="team-modal__container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="team-modal__header">
          <div className="team-modal__header-text">
            <span className="text-label team-modal__eyebrow">Unity Leadership & Ministries</span>
            <h2 id="team-modal-title" className="text-display team-modal__title">
              Meet Our Team
            </h2>
            <p className="text-body-lg team-modal__subtitle">
              The faithful leaders, pastors, and servants dedicated to shepherding our church family, 
              guiding transformative worship, and serving our broader community with excellence.
            </p>
          </div>

          <button
            className="team-modal__close-btn"
            onClick={onClose}
            aria-label="Close Team Modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Category Filters */}
        <div className="team-modal__filters" role="tablist">
          {TEAM_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`team-modal__filter-btn ${activeCategory === cat ? 'team-modal__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="team-modal__grid">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`team-card ${member.featured ? 'team-card--featured' : ''}`}
            >
              <div className="team-card__image-wrap">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="team-card__image"
                  style={{ objectPosition: member.objectPosition || 'center center' }}
                  loading="eager"
                />
                <div className="team-card__image-overlay" />
                <span className="team-card__badge text-label">
                  {member.role}
                </span>
              </div>

              <div className="team-card__content">
                <span className="team-card__dept text-label">{member.department}</span>
                <h3 className="team-card__name">{member.name}</h3>
                <div className="team-card__divider" />
                <p className="team-card__passage">{member.passage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="team-modal__footer">
          <p className="text-body text-muted">
            Interested in serving or getting connected with a ministry leader?
          </p>
          <a
            href="#visit"
            className="btn btn--primary"
            onClick={onClose}
          >
            Connect With Us
          </a>
        </div>
      </div>
    </div>
  );
}
