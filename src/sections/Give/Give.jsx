import FadeSection from '../../components/FadeSection/FadeSection';
import waysToGiveImg from '../../assets/attachments (1)/WAYS TO GIVE.JPEG';
import './Give.css';

/**
 * Give — Generosity and partnership section linking directly to BreezeCHMS.
 */
export default function Give() {
  const giveUrl = 'https://unitycc.breezechms.com/give/online';

  return (
    <section className="give section section--alt" id="give">
      <div className="container container--content">
        <div className="give__header text-center">
          <FadeSection direction="up" delay={0}>
            <span className="text-label" style={{ color: 'var(--color-accent)' }}>
              Generosity & Faith
            </span>
          </FadeSection>

          <FadeSection direction="up" delay={0.1}>
            <h2 className="text-display give__title">
              Investing In Purpose.
            </h2>
          </FadeSection>

          <FadeSection direction="up" delay={0.2}>
            <p className="text-body-lg text-muted give__subtitle">
              Your generosity empowers our ministries, supports families in need, 
              funds community outreach, and advances the mission of Unity Christian Church.
            </p>
          </FadeSection>
        </div>

        <div className="give__grid">
          {/* Visual card with official Ways to Give asset */}
          <FadeSection direction="right" delay={0.2}>
            <div className="give__visual-card">
              <img
                src={waysToGiveImg}
                alt="Ways to Give to Unity Christian Church"
                className="give__visual-img"
                loading="lazy"
              />
            </div>
          </FadeSection>

          {/* Action details */}
          <FadeSection direction="left" delay={0.3}>
            <div className="give__content-card">
              <h3 className="text-h3 give__content-title">Give Online Safely & Easily</h3>
              <p className="text-body give__content-text">
                Whether you are giving your tithe, offering, or contributing to a special outreach initiative, 
                our secure online giving portal through BreezeCHMS makes it simple, safe, and immediate.
              </p>

              <ul className="give__features">
                <li className="give__feature-item">
                  <span className="give__feature-check">✓</span>
                  <span>One-time or recurring gifts</span>
                </li>
                <li className="give__feature-item">
                  <span className="give__feature-check">✓</span>
                  <span>Bank account (ACH) or Debit/Credit card</span>
                </li>
                <li className="give__feature-item">
                  <span className="give__feature-check">✓</span>
                  <span>100% secure, encrypted transactions</span>
                </li>
              </ul>

              <div className="give__actions">
                <a
                  href={giveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary give__btn-primary"
                >
                  Give Online Now →
                </a>
                <a
                  href={giveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  Setup Recurring Giving
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
