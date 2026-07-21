import FadeSection from '../../components/FadeSection/FadeSection';
import ParallaxImage from '../../components/ParallaxImage/ParallaxImage';
import './InteriorShowcase.css';

/**
 * InteriorShowcase — Container for all 7 interior space sections.
 * Alternating layouts with rich typography and parallax imagery.
 */

const SPACES = [
  {
    id: 'lobby',
    label: 'First Impressions',
    title: 'The Lobby',
    description:
      'A warm embrace from the moment you arrive. Open, inviting, and designed to make every guest feel at home. The lobby is where connections begin — where familiar faces meet new friends.',
    accent: 'Where belonging begins.',
    layout: 'full',
    gradient: 'linear-gradient(135deg, #E8DDD0, #D4C5B3)',
    icon: '🏛️',
  },
  {
    id: 'worship',
    label: 'The Heart',
    title: 'Worship Stage',
    description:
      'An immersive space designed for encounter. State-of-the-art acoustics and lighting create an atmosphere where worship transcends the ordinary. Every seat is the best seat.',
    accent: 'Where hearts unite in worship.',
    layout: 'right',
    gradient: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)',
    dark: true,
    icon: '🎵',
  },
  {
    id: 'gymnasium',
    label: 'Community',
    title: 'The Gymnasium',
    description:
      'More than a gym — it\'s where the church family plays, celebrates, and grows together. From basketball tournaments to fellowship dinners, this versatile space adapts to every occasion.',
    accent: 'Where community plays together.',
    layout: 'left',
    gradient: 'linear-gradient(135deg, #F0E4D8, #E8CEB5)',
    icon: '🏀',
  },
  {
    id: 'classrooms',
    label: 'Growth',
    title: 'Classrooms',
    description:
      'Purpose-built learning environments for Bible studies, small groups, and workshops. Each room is equipped with modern technology and designed for meaningful dialogue and discovery.',
    accent: 'Where minds and spirits grow.',
    layout: 'right',
    gradient: 'linear-gradient(135deg, #F5F0EA, #E8E4DF)',
    icon: '📖',
  },
  {
    id: 'children',
    label: 'Next Generation',
    title: 'Children\'s Ministry',
    description:
      'A world crafted just for kids — safe, joyful, and brimming with wonder. Age-appropriate spaces where children discover faith through play, creativity, and loving guidance.',
    accent: 'Where little hearts discover big love.',
    layout: 'full',
    gradient: 'linear-gradient(135deg, #F8E8D4, #F0D8C0)',
    icon: '🌟',
  },
  {
    id: 'admin',
    label: 'Behind the Scenes',
    title: 'Administration',
    description:
      'The operational heart that keeps everything running smoothly. Modern offices and meeting rooms where the leadership team plans, strategizes, and serves the church family.',
    accent: 'Where vision meets execution.',
    layout: 'left',
    gradient: 'linear-gradient(135deg, #E8E4DF, #D1CBC3)',
    icon: '⚙️',
  },
  {
    id: 'community',
    label: 'Together',
    title: 'Community Spaces',
    description:
      'Flexible gathering areas designed for connection — coffee bar, lounge seating, outdoor patios. These are the in-between places where life happens and relationships deepen.',
    accent: 'Where life happens between Sundays.',
    layout: 'right',
    gradient: 'linear-gradient(135deg, #E8DDD0, #C8B5A0)',
    icon: '☕',
  },
];

function SpaceSection({ space, index }) {
  const isEven = index % 2 === 0;
  const isDark = space.dark;

  if (space.layout === 'full') {
    return (
      <div
        className={`interior-space interior-space--full ${isDark ? 'interior-space--dark' : ''}`}
        id={space.id}
      >
        {/* Full-bleed background */}
        <div
          className="interior-space__bg"
          style={{ background: space.gradient }}
        />

        <div className="container interior-space__full-content">
          <FadeSection direction="up" delay={0}>
            <span className="interior-space__icon">{space.icon}</span>
          </FadeSection>
          <FadeSection direction="up" delay={0.1}>
            <span className="text-label interior-space__label">{space.label}</span>
          </FadeSection>
          <FadeSection direction="up" delay={0.2}>
            <h2 className="text-h1 interior-space__title">{space.title}</h2>
          </FadeSection>
          <FadeSection direction="up" delay={0.3}>
            <div className="divider divider--center" />
          </FadeSection>
          <FadeSection direction="up" delay={0.4}>
            <p className="text-body-lg interior-space__desc">{space.description}</p>
          </FadeSection>
          <FadeSection direction="none" delay={0.6}>
            <p className="text-accent interior-space__accent">{space.accent}</p>
          </FadeSection>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`interior-space interior-space--split ${isDark ? 'interior-space--dark' : ''}`}
      id={space.id}
    >
      <div className={`container split ${space.layout === 'right' ? '' : 'split--reverse'}`}>
        {/* Image side */}
        <FadeSection direction={space.layout === 'right' ? 'left' : 'right'} delay={0}>
          <div className="interior-space__image-wrap">
            <div
              className="interior-space__placeholder"
              style={{ background: space.gradient }}
            >
              <span className="interior-space__placeholder-icon">{space.icon}</span>
              <span className="interior-space__placeholder-text text-label">
                {space.title}
              </span>
            </div>
          </div>
        </FadeSection>

        {/* Text side */}
        <div className="interior-space__text-side">
          <FadeSection direction="up" delay={0.1}>
            <span className="text-label interior-space__label">{space.label}</span>
          </FadeSection>
          <FadeSection direction="up" delay={0.2}>
            <h2 className={`text-h2 interior-space__title ${isDark ? 'interior-space__title--light' : ''}`}>
              {space.title}
            </h2>
          </FadeSection>
          <FadeSection direction="up" delay={0.3}>
            <div className="divider" />
          </FadeSection>
          <FadeSection direction="up" delay={0.4}>
            <p className={`text-body-lg interior-space__desc ${isDark ? 'interior-space__desc--light' : ''}`}>
              {space.description}
            </p>
          </FadeSection>
          <FadeSection direction="none" delay={0.5}>
            <p className="text-accent interior-space__accent">{space.accent}</p>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}

export default function InteriorShowcase() {
  return (
    <section className="interior-showcase" id="spaces">
      {/* Section header */}
      <div className="container interior-showcase__header">
        <FadeSection direction="up" delay={0}>
          <span className="text-label" style={{ color: 'var(--color-accent)' }}>
            Explore the spaces
          </span>
        </FadeSection>
        <FadeSection direction="up" delay={0.1}>
          <h2 className="text-display interior-showcase__heading">
            Every space tells<br />a story.
          </h2>
        </FadeSection>
        <FadeSection direction="up" delay={0.2}>
          <p className="text-body-lg text-muted interior-showcase__subheading">
            Designed with intention. Built with purpose.<br />
            Discover the rooms that make Unity Church home.
          </p>
        </FadeSection>
      </div>

      {/* Space sections */}
      {SPACES.map((space, index) => (
        <SpaceSection key={space.id} space={space} index={index} />
      ))}
    </section>
  );
}
