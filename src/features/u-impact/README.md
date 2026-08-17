# U Impact — Building & Space Exploration Experience

> **Status:** Preserved for future use. Not rendered on the Unity Christian Church homepage.

## What Is This?

This module contains the complete building/space-exploration experience that was originally developed as part of the Unity Christian Church website. It includes:

- **Scroll-driven construction animation** — A cinematic experience that shows the church being built, driven by scroll progress with GSAP ScrollTrigger
- **Interior showcase sections** — Seven interior space sections (Lobby, Worship Stage, Gymnasium, Classrooms, Children's Ministry, Administration, Community Spaces) with alternating layouts, parallax imagery, and fade animations
- **Transition section** — A dramatic "Step inside" bridge between the construction and interior experiences
- **Cinematic engine** — A reusable scroll-driven video/image system with scene timelines, text reveals, and progress indicators

## Directory Structure

```
u-impact/
├── index.js                    ← Barrel export (import everything from here)
├── README.md                   ← This file
├── sections/
│   ├── InteriorShowcase/       ← "Explore the Spaces" — all 7 interior rooms
│   ├── Construction/           ← Scroll-driven construction animation (GSAP)
│   ├── Transition/             ← "Step inside" bridge section
│   └── Hero/                   ← Full construction cinematic hero
├── components/
│   └── cinematic/              ← Reusable cinematic scroll engine
│       ├── CinematicScrollExperience.jsx  ← Main orchestrator
│       ├── MediaCanvas/        ← Video/image rendering layer
│       ├── ScrollScene/        ← GSAP ScrollTrigger wrapper
│       ├── TextReveal/         ← Animated text overlay
│       ├── ProgressBar/        ← Scroll progress indicator
│       ├── ScrollIndicator/    ← "Begin the Journey" prompt
│       ├── sceneTimeline.js    ← Scene configuration data
│       └── index.js            ← Cinematic barrel export
├── pages/
│   └── ConstructionPreview.jsx ← Dev preview page (accessible via /#/dev/construction-preview)
├── hooks/
│   └── useScrollProgress.js    ← GSAP ScrollTrigger progress hook
└── config/
    └── sceneTimeline.js        ← Compatibility re-export
```

## How to Use (Future U Impact Website)

```jsx
// Import sections
import { InteriorShowcase, Construction, Transition } from '../features/u-impact';

// Import the full cinematic experience
import { CinematicScrollExperience, SCENE_TIMELINE } from '../features/u-impact';

// Use in your page
function UImpactPage() {
  return (
    <main>
      <CinematicScrollExperience
        scenes={SCENE_TIMELINE}
        videoSrc="/video/construction.mp4"
        height="600vh"
      />
      <Transition />
      <InteriorShowcase />
    </main>
  );
}
```

## Shared Dependencies

This module depends on shared components that remain in `src/components/`:
- `FadeSection` — Scroll-triggered fade-in animations
- `ParallaxImage` — Parallax scrolling image wrapper
- `ChurchLogo` — Church logo component

And shared libraries:
- `gsap` + `ScrollTrigger` — Scroll-driven animations
- `lenis` — Smooth scrolling (initialized at app root level)

## Video Assets

The construction videos are stored in `src/assets/` and served from `public/video/`:
- Scene 1–8 individual clips
- Combined construction video
