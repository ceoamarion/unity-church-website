import FadeSection from '../../components/FadeSection/FadeSection';
import './Visit.css';

/**
 * Visit — Service times, location details, directions, and planning a visit CTA.
 */
export default function Visit() {
  return (
    <section className="visit section" id="visit">
      <div className="container">
        <div className="visit__header text-center">
          <FadeSection direction="up" delay={0}>
            <span className="text-label" style={{ color: 'var(--color-accent)' }}>
              Plan Your Visit
            </span>
          </FadeSection>
          <FadeSection direction="up" delay={0.1}>
            <h2 className="text-display visit__title">
              We Can't Wait To<br />Welcome You Home.
            </h2>
          </FadeSection>
          <FadeSection direction="up" delay={0.2}>
            <p className="text-body-lg text-muted visit__subtitle">
              Join us this Sunday for worship, fellowship, and an inspiring message.
            </p>
          </FadeSection>
        </div>

        <div className="visit__cards-grid">
          {/* Card 1: Service Times */}
          <FadeSection direction="up" delay={0.1}>
            <div className="visit__card">
              <div className="visit__card-icon">⏰</div>
              <h3 className="text-h3 visit__card-title">Service Times</h3>
              <ul className="visit__card-list">
                <li>
                  <strong>Sunday 9:00 AM</strong> — Traditional Worship
                </li>
                <li>
                  <strong>Sunday 11:00 AM</strong> — Contemporary Worship
                </li>
                <li>
                  <strong>Wednesday 7:00 PM</strong> — Midweek Bible Study
                </li>
              </ul>
            </div>
          </FadeSection>

          {/* Card 2: Location */}
          <FadeSection direction="up" delay={0.2}>
            <div className="visit__card">
              <div className="visit__card-icon">📍</div>
              <h3 className="text-h3 visit__card-title">Our Location</h3>
              <p className="visit__card-text">
                123 Faith Avenue<br />
                Community City, ST 12345
              </p>
              <div className="visit__card-action">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="visit__link"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </FadeSection>

          {/* Card 3: What to Expect */}
          <FadeSection direction="up" delay={0.3}>
            <div className="visit__card">
              <div className="visit__card-icon">✨</div>
              <h3 className="text-h3 visit__card-title">What To Expect</h3>
              <p className="visit__card-text">
                Come as you are! Friendly faces, uplifting music, vibrant kids programs, 
                and fresh coffee waiting for you in the lobby.
              </p>
              <div className="visit__card-action">
                <button className="btn btn--primary">VIP Guest Registration</button>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
