# U Impact Construction Experience — Dependencies

This document lists every external package required by the exported construction and scroll experience.

---

## Required npm Packages

### 1. `gsap` (GreenSock Animation Platform)
- **Tested Version**: `^3.15.0`
- **Installation**: `npm install gsap`
- **Why it is required**:
  - Powers the `ScrollTrigger` engine that pins the viewport during scroll runways (`height="600vh"`).
  - Normalizes scroll distance to a precise `0.00` → `1.00` progress value.
  - Manages enter/leave trigger callbacks and lag-smoothing tickers.

### 2. `lenis` (@studio-freight / darkroomengineering)
- **Tested Version**: `^1.3.25`
- **Installation**: `npm install lenis`
- **Why it is required**:
  - Provides momentum/inertia smooth scrolling that synchronizes with the GSAP ticker.
  - Prevents micro-stutter during video scrubbing and fast wheel gestures.
  - Normalizes touchpad, mouse wheel, and mobile touch events.

### 3. `react` & `react-dom`
- **Tested Version**: `^18.2.0` / `^19.2.7`
- **Installation**: `npm install react react-dom`
- **Why it is required**:
  - Core component architecture, state management (`useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`), and lifecycle orchestration.

---

## Dev / Build Dependencies (for new React/Vite project)

If you are setting up a new Vite project for U Impact from scratch:

```bash
npm create vite@latest u-impact -- --template react
cd u-impact
npm install gsap lenis
```

---

## Dependency Checklist for U Impact Project

```json
{
  "dependencies": {
    "gsap": "^3.15.0",
    "lenis": "^1.3.25",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  }
}
```
