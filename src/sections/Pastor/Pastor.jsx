import FadeSection from '../../components/FadeSection/FadeSection';
import './Pastor.css';

/**
 * Pastor — Dark biography showcase section with warm accent typography
 * and an inspiring message from the leadership.
 */
export default function Pastor() {
  return (
    <section className="pastor section--dark" id="pastor">
      <div className="container pastor__container">
        <div className="pastor__grid">
          {/* Left Column: Image/Portrait Placeholder with Glassmorphism overlay */}
          <FadeSection direction="right" delay={0}>
            <div className="pastor__portrait-wrap">
              <div className="pastor__portrait-card">
                <div className="pastor__portrait-bg" />
                <div className="pastor__portrait-badge text-label">
                  Lead Pastors
                </div>
                <div className="pastor__portrait-content">
                  <h3 className="text-h2 pastor__name">Vance & Family</h3>
                  <p className="text-accent text-muted">Serving Unity Church</p>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Right Column: Bio & Message */}
          <div className="pastor__content">
            <FadeSection direction="up" delay={0.1}>
              <span className="text-label" style={{ color: 'var(--color-accent)' }}>
                Our Leadership
              </span>
            </FadeSection>

            <FadeSection direction="up" delay={0.2}>
              <h2 className="text-display pastor__title">
                A Heart For<br />The Community.
              </h2>
            </FadeSection>

            <FadeSection direction="up" delay={0.3}>
              <div className="divider" style={{ background: 'var(--color-accent)' }} />
            </FadeSection>

            <FadeSection direction="up" delay={0.4}>
              <p className="text-body-lg pastor__desc">
                "Our mission from day one has been simple: to create a space where everyone, 
                regardless of their background or story, can experience the unconditional love 
                of Jesus and find a place to belong."
              </p>
            </FadeSection>

            <FadeSection direction="up" delay={0.5}>
              <p className="text-body text-muted pastor__bio">
                At Unity Church, leadership is about service. We believe in building up the next 
                generation, serving our local neighborhood, and cultivating an environment of 
                authentic worship and deep community ties.
              </p>
            </FadeSection>

            <FadeSection direction="up" delay={0.6}>
              <div className="pastor__actions">
                <a href="#visit" className="btn btn--primary">Meet Our Team</a>
              </div>
            </FadeSection>
          </div>
        </div>
      </div>
    </section>
  );
}
