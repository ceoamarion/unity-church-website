import FadeSection from '../../components/FadeSection/FadeSection';
import './Visit.css';

/**
 * Visit — Service times, location details, directions, and planning a visit CTA.
 * Updated with official service times (Sunday 10:30am, Monday 7:00pm, Wednesday 7:00pm)
 * and address (1631 Trinity Church Rd, Alcolu, SC 29001).
 */
export default function Visit() {
  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=1631+Trinity+Church+Rd,+Alcolu,+SC+29001';

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
              Join us this week for transformative worship, fervent prayer, and biblical teaching in Alcolu, SC.
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
                  <strong>Sunday 10:30 AM EST</strong><br />
                  <span>Sunday Worship Service</span>
                </li>
                <li>
                  <strong>Monday 7:00 PM EST</strong><br />
                  <span>Corporate Prayer Meeting</span>
                </li>
                <li>
                  <strong>Wednesday 7:00 PM EST</strong><br />
                  <span>Midweek Bible Study</span>
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
                <strong>Unity Christian Church</strong><br />
                1631 Trinity Church Rd<br />
                Alcolu, SC 29001
              </p>
              <div className="visit__card-action">
                <a 
                  href={directionsUrl} 
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
                Come as you are! Warm hospitality, spirit-filled worship, vibrant ministries for 
                every generation, and a loving community ready to embrace you.
              </p>
              <div className="visit__card-action">
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Visit This Sunday
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
