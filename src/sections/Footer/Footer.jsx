import FadeSection from '../../components/FadeSection/FadeSection';
import './Footer.css';

/**
 * Footer — Service times, official address, contact info, and giving link.
 */
export default function Footer() {
  const giveUrl = 'https://unitycc.breezechms.com/give/online';
  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=1631+Trinity+Church+Rd,+Alcolu,+SC+29001';

  return (
    <footer className="footer section--dark" id="footer">
      {/* CTA Section */}
      <div className="footer__cta-section">
        <div className="container footer__cta-content">
          <FadeSection direction="up" delay={0}>
            <span className="text-label footer__cta-label">Join us</span>
          </FadeSection>
          <FadeSection direction="up" delay={0.1}>
            <h2 className="text-display footer__cta-title">
              You're always<br />welcome here.
            </h2>
          </FadeSection>
          <FadeSection direction="up" delay={0.2}>
            <p className="text-body-lg footer__cta-desc">
              Whether it's your first visit or you've been searching for a spiritual home, 
              there is a place for you at Unity Christian Church.
            </p>
          </FadeSection>
          <FadeSection direction="up" delay={0.3}>
            <div className="footer__cta-buttons">
              <a href="#visit" className="btn btn--primary">Plan Your Visit</a>
              <a 
                href={giveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--dark"
              >
                Give Online
              </a>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* Info Grid */}
      <div className="container footer__grid">
        <FadeSection direction="up" delay={0}>
          <div className="footer__col">
            <h3 className="footer__col-title">Unity Christian Church</h3>
            <p className="footer__tagline text-accent">
              "Where faith builds community"
            </p>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.1}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Service Times</h4>
            <ul className="footer__list">
              <li>Sunday 10:30 AM EST — Worship Service</li>
              <li>Monday 7:00 PM EST — Prayer Meeting</li>
              <li>Wednesday 7:00 PM EST — Bible Study</li>
            </ul>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.2}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Location</h4>
            <ul className="footer__list">
              <li>1631 Trinity Church Rd</li>
              <li>Alcolu, SC 29001</li>
              <li>
                <a 
                  href={directionsUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer__link-item"
                >
                  Get Directions →
                </a>
              </li>
            </ul>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.3}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Support & Connect</h4>
            <ul className="footer__list">
              <li>
                <a 
                  href={giveUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer__link-item"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Give Online (BreezeCHMS) →
                </a>
              </li>
              <li className="footer__link-item">info@unitychurch.org</li>
              <li className="footer__social">
                <span className="footer__social-link">Facebook</span>
                <span className="footer__social-divider">·</span>
                <span className="footer__social-link">Instagram</span>
                <span className="footer__social-divider">·</span>
                <span className="footer__social-link">YouTube</span>
              </li>
            </ul>
          </div>
        </FadeSection>
      </div>

      {/* Bottom bar */}
      <div className="container footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Unity Christian Church. All rights reserved.
        </p>
        <p className="footer__credit">
          1631 Trinity Church Rd, Alcolu, SC 29001
        </p>
      </div>
    </footer>
  );
}
