# U-Impact — Standalone Component Suite & Cinematic 3D Experience

A completely self-contained, portable React module featuring:
- **3D WebGL Particle System**: 500+ interactive celestial stardust particles with raycasting and HUD metrics.
- **Scroll-Driven Video Scrubbing**: Multi-scene synchronized video runway (`full-scene.mp4`, `scene-1` through `scene-4`).
- **Interactive Community Pillars**: 6 comprehensive pillar categories with live modal pledges and filtering.
- **Transformation Stories**: Interactive testimonials and impact metrics.
- **Physical Spaces & Interior Showcase**: Parallax photography and architectural room exploration.
- **Upcoming Activations**: Real-time RSVP calendar with category tagging.
- **Pledge & Get Involved Modal**: Interactive multi-tab pledge workflow.
- **Audio Synthesizer & Smooth Scroll**: Web Audio ambient soundscape + Lenis momentum scroll.

---

## 1. Quick Installation into Another Project

### Step 1: Copy this Folder
Copy the `u-impact-export` folder directly into your new project (for example, at `src/u-impact-export` or `components/u-impact-export`).

### Step 2: Install Dependencies
Run the following command in your project root:

```bash
npm install gsap lenis lucide-react three
```

*(If using React 18 or 19, standard `react` and `react-dom` are also required)*

### Step 3: Copy Video Assets
Copy the video files in `u-impact-export/assets/videos/` to your target project's `public/videos/` folder:
- `full-scene.mp4`
- `scene-1-dark-clouds.mp4`
- `scene-2-light-clouds.mp4`
- `scene-3-building.mp4`
- `scene-4-light-spreading.mp4`

---

## 2. Usage Examples

### Option A: Render Full Turnkey Experience (1 Line)

```jsx
import React from 'react';
import { UImpactApp } from './u-impact-export';

export default function App() {
  return <UImpactApp />;
}
```

### Option B: Import Individual Modular Components

```jsx
import React from 'react';
import { 
  ImpactIntro, 
  PillarsSection, 
  StoriesSection, 
  ConstructionSection, 
  UpcomingSection,
  Navbar,
  Footer,
  useLenis
} from './u-impact-export';

import './u-impact-export/styles/index.css';
import './u-impact-export/styles/tokens.css';

export default function CustomPage() {
  useLenis();

  return (
    <div className="u-impact-app">
      <Navbar onGetInvolvedClick={() => console.log('Open modal')} />
      <main>
        <ImpactIntro />
        <PillarsSection />
        <StoriesSection />
        <ConstructionSection />
        <UpcomingSection />
      </main>
      <Footer />
    </div>
  );
}
```

### Option C: Next.js (App Router) Integration

Since this module utilizes WebGL, GSAP ScrollTrigger, and Web Audio APIs, ensure the parent component is a Client Component:

```tsx
'use client';

import dynamic from 'next/dynamic';

const UImpactApp = dynamic(
  () => import('./u-impact-export').then(mod => mod.UImpactApp),
  { ssr: false }
);

export default function Page() {
  return <UImpactApp />;
}
```

---

## 3. Google Fonts Setup

For optimal typography, include these Google Fonts in your `index.html` or `layout.tsx`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

---

## 4. Folder Structure Reference

```
u-impact-export/
├── index.js                     ← Universal Master Export
├── App.jsx                      ← Turnkey Root Experience (<UImpactApp />)
├── package.json                 ← Required dependencies & versions
├── README.md                    ← Integration guide
├── assets/
│   └── videos/                  ← Scrubber videos for public/videos
├── components/
│   ├── intro/                   ← 3D WebGL Particle & Cinematic Hero
│   ├── navigation/              ← Glassmorphic Navbar
│   ├── sections/                ← Community, Pillars, Stories, Construction, Upcoming, Modal
│   ├── construction/            ← Cinematic Scroll Video Scrubbing System
│   └── spaces/                  ← Architectural Spaces & Showcases
├── hooks/                       ← Lenis, ScrollProgress, SmoothScroll, LazyMedia
├── data/                        ← Scene Timelines & Triggers
└── styles/                      ← Tokens & Global Dark Stylesheet
```
