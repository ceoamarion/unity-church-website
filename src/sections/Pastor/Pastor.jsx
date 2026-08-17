import { useState } from 'react';
import FadeSection from '../../components/FadeSection/FadeSection';
import TeamModal from '../../components/TeamModal/TeamModal';
import tjGroomsImg from '../../assets/attachments (1)/TJ Grooms-Pastor.JPEG';
import './Pastor.css';

/**
 * Pastor — Leadership showcase section featuring Pastor TJ Grooms
 * and interactive "Meet Our Team" ministry leadership modal.
 */
export default function Pastor() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  return (
    <>
      <section className="pastor section--dark" id="pastor">
        <div className="container pastor__container">
          <div className="pastor__grid">
            {/* Left Column: Pastor TJ Grooms Portrait Frame */}
            <FadeSection direction="right" delay={0}>
              <div className="pastor__portrait-wrap">
                <div className="pastor__portrait-card">
                  {/* Photo of Pastor TJ Grooms */}
                  <img
                    src={tjGroomsImg}
                    alt="Pastor TJ Grooms - Lead Pastor of Unity Christian Church"
                    className="pastor__portrait-img"
                    loading="eager"
                  />
                  <div className="pastor__portrait-overlay" />
                  <div className="pastor__portrait-badge text-label">
                    Lead Pastor
                  </div>
                  <div className="pastor__portrait-content">
                    <h3 className="text-h2 pastor__name">Pastor TJ Grooms</h3>
                    <p className="text-accent pastor__role">Lead Pastor, Unity Christian Church</p>
                  </div>
                </div>
              </div>
            </FadeSection>

            {/* Right Column: Bio, Vision & Meet Team Action */}
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
                <blockquote className="pastor__quote">
                  <p className="text-body-lg pastor__desc">
                    "Our mission from day one has been simple: to create a space where everyone, 
                    regardless of their background or story, can experience the unconditional love 
                    of Jesus and find a place to belong."
                  </p>
                </blockquote>
              </FadeSection>

              <FadeSection direction="up" delay={0.5}>
                <p className="text-body text-muted pastor__bio">
                  At Unity Christian Church, leadership is rooted in service and community impact. 
                  Led by Pastor TJ Grooms, our pastoral and ministry teams are dedicated to building up 
                  families, equipping believers, serving our neighborhood, and cultivating an environment of 
                  authentic worship, passionate prayer, and deep fellowship.
                </p>
              </FadeSection>

              <FadeSection direction="up" delay={0.6}>
                <div className="pastor__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setIsTeamModalOpen(true)}
                  >
                    Meet Our Team
                  </button>
                  <a href="#visit" className="btn btn--ghost btn--dark">
                    Plan Your Visit
                  </a>
                </div>
              </FadeSection>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Ministry Team Modal */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />
    </>
  );
}
