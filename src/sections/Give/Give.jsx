import FadeSection from '../../components/FadeSection/FadeSection';
import './Give.css';

/**
 * Give — Generosity and partnership section with minimal, elegant styling.
 */
export default function Give() {
  return (
    <section className="give section section--alt" id="give">
      <div className="container container--content text-center">
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
            and fuels the expansion of our new Unity Church home.
          </p>
        </FadeSection>

        <FadeSection direction="up" delay={0.3}>
          <div className="give__actions">
            <button className="btn btn--primary">Give Online</button>
            <button className="btn btn--ghost">Building Fund Details</button>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
