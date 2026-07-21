import FadeSection from '../../components/FadeSection/FadeSection';
import './Footer.css';

/**
 * Footer — Service times, address, contact info, and "Visit Us" CTA.
 * Minimal, elegant design with warm accents.
 */
export default function Footer() {
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
              Whether it's your first visit or your hundredth, there's a place for you at Unity Church.
            </p>
          </FadeSection>
          <FadeSection direction="up" delay={0.3}>
            <div className="footer__cta-buttons">
              <button className="btn btn--primary">Plan Your Visit</button>
              <button className="btn btn--dark">Watch Online</button>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* Info Grid */}
      <div className="container footer__grid">
        <FadeSection direction="up" delay={0}>
          <div className="footer__col">
            <h3 className="footer__col-title">Unity Church</h3>
            <p className="footer__tagline text-accent">
              "Where faith builds community"
            </p>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.1}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Service Times</h4>
            <ul className="footer__list">
              <li>Sunday 9:00 AM — Traditional</li>
              <li>Sunday 11:00 AM — Contemporary</li>
              <li>Wednesday 7:00 PM — Bible Study</li>
            </ul>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.2}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Location</h4>
            <ul className="footer__list">
              <li>123 Faith Avenue</li>
              <li>Community City, ST 12345</li>
              <li className="footer__link-item">Get Directions →</li>
            </ul>
          </div>
        </FadeSection>

        <FadeSection direction="up" delay={0.3}>
          <div className="footer__col">
            <h4 className="footer__heading text-label">Connect</h4>
            <ul className="footer__list">
              <li className="footer__link-item">info@unitychurch.org</li>
              <li className="footer__link-item">(555) 123-4567</li>
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
          © 2026 Unity Church. All rights reserved.
        </p>
        <p className="footer__credit">
          Built with faith & purpose.
        </p>
      </div>
    </footer>
  );
}
