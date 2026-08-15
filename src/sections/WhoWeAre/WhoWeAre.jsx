import FadeSection from '../../components/FadeSection/FadeSection';
import './WhoWeAre.css';

/**
 * WhoWeAre — Post-hero introduction section.
 * 
 * Creates a smooth visual bridge between the hero image and the rest
 * of the website. Uses oversized typography and generous whitespace
 * for an Apple-inspired "statement" moment.
 */
export default function WhoWeAre() {
  return (
    <section className="who-we-are" id="about">
      <div className="who-we-are__inner">
        <FadeSection direction="up" delay={0}>
          <h2 className="who-we-are__headline">
            More Than<br />
            <span className="who-we-are__headline-accent">A Sunday.</span>
          </h2>
        </FadeSection>

        <FadeSection direction="up" delay={0.15}>
          <div className="who-we-are__divider" />
        </FadeSection>

        <FadeSection direction="up" delay={0.25}>
          <p className="who-we-are__body">
            Unity Church is a community built on faith, fellowship, and purpose. 
            We exist to create a space where everyone — regardless of background 
            or story — can experience authentic worship, meaningful connection, 
            and real transformation.
          </p>
        </FadeSection>

        <FadeSection direction="none" delay={0.4}>
          <p className="who-we-are__accent">
            "Where faith builds community."
          </p>
        </FadeSection>
      </div>
    </section>
  );
}
