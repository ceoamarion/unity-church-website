# U Impact — Interactive Construction & Cinematic Scroll Experience

A complete, self-contained, and portable React module for scroll-driven construction video scrubbing, dynamic text reveals, progress tracking, and 3D/parallax spatial showcases.

---

## 1. What This Folder Contains

This export contains all source code, components, hooks, animations, styles, and data structures required to run the interactive construction experience on the **U Impact** website.

```
U-IMPACT-CONSTRUCTION-EXPORT/
├── index.js                                    ← Master barrel export & primary entry point
├── README.md                                   ← This comprehensive guide
├── DEPENDENCIES.md                             ← Package requirements & install instructions
│
├── components/
│   ├── CinematicScrollExperience/              ← Primary orchestrator component
│   │   ├── CinematicScrollExperience.jsx
│   │   └── CinematicScrollExperience.css
│   ├── ScrollScene/                            ← GSAP ScrollTrigger pinning runway
│   │   ├── ScrollScene.jsx
│   │   └── ScrollScene.css
│   ├── MediaCanvas/                            ← Video/Image rendering abstraction
│   │   ├── MediaCanvas.jsx
│   │   ├── MediaCanvas.css
│   │   ├── VideoRenderer.jsx                   ← RAF interpolated video playhead scrubber
│   │   └── ImageRenderer.jsx                   ← Layered CSS/gradient fallback renderer
│   ├── TextReveal/                             ← Scroll-synced fade & blur typography overlays
│   │   ├── TextReveal.jsx
│   │   └── TextReveal.css
│   ├── ProgressBar/                            ← Bottom progress track & phase indicators
│   │   ├── ProgressBar.jsx
│   │   └── ProgressBar.css
│   ├── ScrollIndicator/                        ← "Scroll to explore" animated prompt
│   │   ├── ScrollIndicator.jsx
│   │   └── ScrollIndicator.css
│   ├── FadeSection/                            ← IntersectionObserver scroll fade-in wrapper
│   │   ├── FadeSection.jsx
│   │   └── FadeSection.css
│   └── ParallaxImage/                          ← Smooth scroll parallax image container
│       ├── ParallaxImage.jsx
│       └── ParallaxImage.css
│
├── sections/
│   ├── Hero/                                   ← Turnkey Construction Hero section
│   │   ├── Hero.jsx
│   │   └── Hero.css
│   ├── Construction/                           ← Classic 5-phase construction section
│   │   ├── Construction.jsx
│   │   └── Construction.css
│   ├── Transition/                             ← "Step Inside" glowing portal bridge
│   │   ├── Transition.jsx
│   │   └── Transition.css
│   └── InteriorShowcase/                       ← Multi-room spatial showcase with split & full layouts
│       ├── InteriorShowcase.jsx
│       └── InteriorShowcase.css
│
├── pages/
│   └── ConstructionPreview.jsx                 ← Turnkey full-page test route
│
├── hooks/
│   ├── useScrollProgress.js                    ← GSAP ScrollTrigger progress hook
│   ├── useSmoothScroll.js                      ← Lenis smooth scroll & ticker coordinator
│   └── useLazyMedia.js                         ← Media observer lazy-loading hook
│
├── data/
│   └── sceneTimeline.js                        ← Timeline configuration & range calculations
│
└── styles/
    └── tokens.css                              ← Self-contained design tokens & utility classes
```

---

## 2. What the Construction Experience Does

1. **Scroll-Driven Video Playhead**:
   - The user's vertical scroll position controls the video timeline (`0%` at the top of the runway to `100%` at the bottom).
   - The video does **not** autoplay on its own; scrolling down scrubs the construction sequence forward, while scrolling up reverses it.
2. **Pinned Viewport Runway**:
   - Pins a full-screen `100vh` viewport for a configurable scroll distance (e.g. `600vh`).
3. **Synchronized Text Overlays**:
   - Fades text headlines and descriptions in and out at exact timeline ranges (e.g., 0%–10% "The Beginning", 10%–22% "The Vision", 22%–38% "Breaking Ground", etc.).
4. **Interactive Progress Bar**:
   - Displays real-time scroll completion percentage and the active phase label.
5. **Spatial Exploration**:
   - Includes seamless transition doorways and interactive multi-room showcase components with parallax photography.

---

## 3. Primary Component Entry Point

The primary orchestrator component to import in U Impact is **`CinematicScrollExperience`**:

```jsx
import { CinematicScrollExperience, SCENE_TIMELINE } from './U-IMPACT-CONSTRUCTION-EXPORT';
import './U-IMPACT-CONSTRUCTION-EXPORT/styles/tokens.css';

export default function UImpactHome() {
  return (
    <main>
      <CinematicScrollExperience
        scenes={SCENE_TIMELINE}
        videoSrc="/video/construction.mp4"
        height="600vh"
        scrub={0.5}
        id="u-impact-construction"
        scrollHintText="Begin the Journey"
      />
    </main>
  );
}
```

Alternatively, if you want the complete full-journey stack (Hero + Transition + Interior Spaces):

```jsx
import { Hero, Transition, InteriorShowcase } from './U-IMPACT-CONSTRUCTION-EXPORT';
import './U-IMPACT-CONSTRUCTION-EXPORT/styles/tokens.css';

export default function UImpactFullExperience() {
  return (
    <main>
      <Hero videoSrc="/video/construction.mp4" />
      <Transition title="Step inside U Impact." subtitle="Where vision meets community." />
      <InteriorShowcase />
    </main>
  );
}
```

---

## 4. How the Scroll System Works

```
[ Window Scroll / Mouse Wheel ]
              │
              ▼
    ┌──────────────────┐
    │  Lenis Smooth    │  ← Normalizes inertia & touchpad/wheel events
    └─────────┬────────┘
              │ (Ticker Sync)
              ▼
    ┌──────────────────┐
    │ GSAP ScrollTrigger│ ← Pins viewport over 600vh runway
    └─────────┬────────┘
              │ (Emits 0.00 → 1.00 Progress)
              ▼
    ┌──────────────────────────────────────────────┐
    │           ScrollScene Dispatch               │
    ├──────────────────────┬───────────────────────┤
    │                      │                       │
    ▼                      ▼                       ▼
┌──────────────┐   ┌──────────────┐       ┌────────────────┐
│ VideoRenderer│   │  TextReveal  │       │  ProgressBar   │
│ (currentTime │   │ (Opacity &   │       │ (Scale & Phase │
│   = p * dur) │   │  Transform)  │       │     Label)     │
└──────────────┘   └──────────────┘       └────────────────┘
```

1. **`useSmoothScroll`** initializes Lenis and ties its RAF callback into `gsap.ticker`.
2. **`ScrollScene`** binds a `ScrollTrigger.create({ trigger: runway, pin: viewport, scrub: 0.5 })`.
3. The resulting `progress` (`0.000` to `1.000`) is passed down to all children.

---

## 5. How Scenes Are Structured

Scenes are defined in [`data/sceneTimeline.js`](file:///c:/Users/super/source/repos/ceoamarion/unity-church-website/U-IMPACT-CONSTRUCTION-EXPORT/data/sceneTimeline.js) as an array of objects:

```js
export const SCENE_TIMELINE = [
  {
    id: 'empty-land',
    phase: 1,
    label: 'The Beginning',
    title: 'Building More\nThan A Space.',
    subtitle: 'Every great structure begins with a vision.',
    range: [0.00, 0.10],      // Scroll progress start & end (0.00 to 0.10)
    textStyle: 'hero',         // 'hero' | 'default' | 'climax'
  },
  {
    id: 'foundation',
    phase: 2,
    label: 'Breaking Ground',
    title: 'A Strong Foundation',
    subtitle: 'The groundwork is laid for generational impact.',
    range: [0.10, 0.25],
    textStyle: 'default',
  },
  // ...
];
```

---

## 6. How Videos Are Synchronized with Scroll Progress

In [`components/MediaCanvas/VideoRenderer.jsx`](file:///c:/Users/super/source/repos/ceoamarion/unity-church-website/U-IMPACT-CONSTRUCTION-EXPORT/components/MediaCanvas/VideoRenderer.jsx):

1. The component tracks `targetTime = progress * video.duration`.
2. An internal `requestAnimationFrame` loop uses linear interpolation (lerp):
   ```js
   const delta = targetTime - video.currentTime;
   if (Math.abs(delta) > 0.01) {
     video.currentTime += delta * 0.15;
   }
   ```
3. This creates a responsive, buttery feel without frame jumping.

---

## 7. How to Add or Customize Scenes

To add or modify scenes in U Impact:

1. Open [`data/sceneTimeline.js`](file:///c:/Users/super/source/repos/ceoamarion/unity-church-website/U-IMPACT-CONSTRUCTION-EXPORT/data/sceneTimeline.js) (or create your own custom array).
2. Adjust `range: [startProgress, endProgress]` so all scenes continuously span `0.00` to `1.00`.
3. Provide your own `label`, `title`, and `subtitle`.
4. Pass your custom array to `<CinematicScrollExperience scenes={myCustomScenes} />`.

---

## 8. Expected Video Filenames & Paths

The component is configured to load the combined construction film.

- **Primary Video Source**: `/video/construction.mp4` (placed in your project's `public/video/construction.mp4`)
- **Original Source Clips (if rendering multi-clip sequences)**:
  - `Scene 1 Empty Land.mp4`
  - `Scene 2 Foundation.mp4`
  - `Scene 3 Steel.mp4`
  - `Scene 4 Exterior.mp4`
  - `Scene 5 Lobby.mp4`
  - `Scene 6 Interior.mp4`
  - `Scene 7 Community.mp4`
  - `Scene 8 Final Reveal.mp4`
  - `All combined Videos of Church Built.mp4`

> **Note**: In U Impact, place your desired video in `public/video/construction.mp4` or pass any video path/URL via the `videoSrc` prop:
> `<CinematicScrollExperience videoSrc="https://cdn.example.com/u-impact-construction.mp4" />`

---

## 9. Required Packages & Installation

Install the required animation and smooth scrolling libraries:

```bash
npm install gsap lenis
```

See [`DEPENDENCIES.md`](file:///c:/Users/super/source/repos/ceoamarion/unity-church-website/U-IMPACT-CONSTRUCTION-EXPORT/DEPENDENCIES.md) for full version details.

---

## 10. Integration Guide (Step-by-Step)

### Step 1: Copy Folder
Copy the entire `U-IMPACT-CONSTRUCTION-EXPORT` folder into your U Impact project under `src/features/construction/` (or your preferred folder).

### Step 2: Install Packages
```bash
npm install gsap lenis
```

### Step 3: Add Video Asset
Copy your video into `public/video/construction.mp4`.

### Step 4: Import in Your Page
```jsx
import { useEffect } from 'react';
import { CinematicScrollExperience, SCENE_TIMELINE, useSmoothScroll } from './features/construction';
import './features/construction/styles/tokens.css';

export default function App() {
  // Initialize Lenis smooth scroll for the page
  useSmoothScroll();

  return (
    <div className="app">
      <CinematicScrollExperience
        scenes={SCENE_TIMELINE}
        videoSrc="/video/construction.mp4"
        height="600vh"
      />
    </div>
  );
}
```

---

## 11. Parent Container Assumptions

1. **Viewport Overflow**: Ensure `body` and `html` do **not** have `overflow: hidden` on the main scroll axis, as GSAP ScrollTrigger relies on window scroll.
2. **Width**: The component assumes standard `width: 100%`.
3. **Z-Index**: The pinned viewport sits at `z-index: 0` to `z-index: 20` for overlays.

---

## 12. Required CSS & Styling

- Include [`styles/tokens.css`](file:///c:/Users/super/source/repos/ceoamarion/unity-church-website/U-IMPACT-CONSTRUCTION-EXPORT/styles/tokens.css) once in your app root or import it in your main entry file.
- All component styles (`CinematicScrollExperience.css`, `MediaCanvas.css`, `TextReveal.css`, etc.) are imported automatically by their respective JSX files.
