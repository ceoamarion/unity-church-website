import { useState, useEffect, useRef } from 'react';
import { TEAM_MEMBERS, TEAM_CATEGORIES } from '../../data/teamData';
import TeamCard from './TeamCard';
import './TeamModal.css';

/**
 * TeamModal — High-End Leadership & Ministry Showcase Modal
 * Displays Unity Christian Church's leaders with interactive 3D holographic profile cards.
 */
export default function TeamModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const backdropRef = useRef(null);
  const gridRef = useRef(null);

  // Contain scrolling and close on Escape key press
  useEffect(() => {
    if (!isOpen) {
      setActiveCategory('All');
      return;
    }

    // Save previous document scroll styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;

    // Lock body and html scrolling while modal is open
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';

    // Pause smooth-scroll engine (Lenis) while modal is open
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Wheel event handler to contain internal scrolling and prevent background scroll chaining
    const handleWheel = (e) => {
      const grid = gridRef.current;
      if (!grid) {
        e.preventDefault();
        return;
      }

      // If wheeling outside the scrollable grid (e.g. header, footer, backdrop padding), prevent page scrolling
      if (!grid.contains(e.target)) {
        e.preventDefault();
        return;
      }

      // If inside the grid, prevent scroll chaining when hitting the top or bottom boundary
      const { scrollTop, scrollHeight, clientHeight } = grid;
      const deltaY = e.deltaY;
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const isAtTop = scrollTop <= 0;

      if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
        e.preventDefault();
      }
    };

    // Touch event handler to prevent background scroll leaking on touch devices
    const handleTouchMove = (e) => {
      const grid = gridRef.current;
      if (!grid || !grid.contains(e.target)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const backdropEl = backdropRef.current;
    if (backdropEl) {
      backdropEl.addEventListener('wheel', handleWheel, { passive: false });
      backdropEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      // Restore previous document scroll styles
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscroll;

      // Resume smooth-scroll engine (Lenis)
      if (window.__lenis) {
        window.__lenis.start();
      }

      window.removeEventListener('keydown', handleKeyDown);
      if (backdropEl) {
        backdropEl.removeEventListener('wheel', handleWheel);
        backdropEl.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMembers = activeCategory === 'All'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.category === activeCategory);

  return (
    <div
      ref={backdropRef}
      className="team-modal__backdrop"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
    >
      <div
        className="team-modal__container"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
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

        {/* Team Grid with 3D Holographic Profile Cards */}
        <div ref={gridRef} className="team-modal__grid" data-lenis-prevent>
          {filteredMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
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
