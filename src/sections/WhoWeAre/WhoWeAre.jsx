import FadeSection from '../../components/FadeSection/FadeSection';
import ChurchLogo from '../../components/ChurchLogo/ChurchLogo';
import './WhoWeAre.css';

/**
 * WhoWeAre — Post-hero introduction + official mission statement.
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

        <FadeSection direction="up" delay={0.15}>
          <p className="who-we-are__mission-text">
            Unity Christian Church is a welcoming church in Alcolu, South Carolina,
            where faith builds community. Join us for worship, prayer, and Bible study,
            or discover how to serve local families through <a href="/u-impact/">Unity Impact</a>.
          </p>
        </FadeSection>

        {/* Mission Label */}
        <FadeSection direction="up" delay={0.2}>
          <span className="who-we-are__label">Our Mission</span>
        </FadeSection>

        {/* Official Mission Statement */}
        <FadeSection direction="up" delay={0.3}>
          <blockquote className="who-we-are__mission">
            <p className="who-we-are__mission-text">
              We exist to pioneer and provide state-of-the-art ministry through 
              powerful preaching, transformative teaching, fervent prayer, intentional 
              discipleship, and impactful outreach—specifically to communities that 
              deserve excellence but often go without it.
            </p>
            <p className="who-we-are__mission-text">
              We aim to set a bold example for churches who desire to do the same, 
              proving that limited resources don't have to limit ministry.
            </p>
          </blockquote>
        </FadeSection>

        {/* Logo accent beneath mission */}
        <FadeSection direction="none" delay={0.45}>
          <div className="who-we-are__logo-accent">
            <ChurchLogo variant="dark" height={52} />
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
