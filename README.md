# ChromaFlora Prime

> Where code blooms into consciousness.

[![CI](https://github.com/qt314wink/chromaflora-prime/actions/workflows/ci.yml/badge.svg)](https://github.com/qt314wink/chromaflora-prime/actions/workflows/ci.yml)

An immersive digital garden built with Next.js 14, WebGL, and a corruption-driven narrative state machine. Every visual layer — fluid glass, elastic cursor, RGB aberration, spatial audio — responds to a six-state narrative engine in real time.

## Stack

| Layer        | Tech                                         |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 14 (App Router)                      |
| Styling      | Tailwind CSS + CSS custom properties         |
| Animation    | Framer Motion                                |
| 3D / Effects | Three.js, @react-three/fiber, postprocessing |
| State        | Zustand + subscribeWithSelector              |
| Audio        | Web Audio API                                |
| Language     | TypeScript (strict)                          |

## Narrative States

```
pristine → awakening → corrupted → fragmenting → authenticated → transcendent
```

Each state transition drives corruption level, audio tone, glitch intensity, and UI colour temperature simultaneously.

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The boot sequence fires automatically on first load.

## Scripts

```bash
npm run dev          # local dev server
npm run build        # production build
npm run type-check   # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write
```

## Project Structure

```
app/                  Next.js App Router (layout, page, error, not-found, loading)
components/
  effects/            Canvas-based visual effects (fluid, cursor, corruption, auth)
  layout/             Navbar
  sections/           Page sections (Hero, Features, Showcase, Footer)
  ui/                 Primitive components (Button, Badge, Card)
hooks/                useNarrative, useAudio, useCorruption
lib/                  store, audio, narrative engine, utils, constants
types/                Shared TypeScript types
public/               Static assets (icon.svg, site.webmanifest)
```

## CI / CD

GitHub Actions runs TypeScript check → lint → Next.js build on every push to `main`. Vercel auto-deploys on merge.

## Notes

- `apple-touch-icon.png` and `og-image.jpg` are excluded for now — drop them into `public/` when ready.
- Audio initialises on first user interaction to comply with browser autoplay policy.
- All canvas effects respect `prefers-reduced-motion`.
