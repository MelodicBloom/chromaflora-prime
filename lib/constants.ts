/* ============================================
   CHROMAFLORA PRIME — CONSTANTS
   Single source of truth for copy, URLs, config
   ============================================ */

export const SITE = {
  name: 'ChromaFlora Prime',
  tagline: 'Where code blooms into consciousness.',
  description:
    'An immersive digital garden where code blooms into consciousness. Experience fluid glass, spectral ink, and corruption-driven narrative.',
  url: 'https://chromaflora.prime',
  ogImage: '/og-image.jpg',
  twitter: '@chromaflora',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  {
    label: 'GitHub',
    href: 'https://github.com/qt314wink/chromaflora-prime',
    external: true,
  },
] as const;

export const RAINBOW_COLORS = [
  '#ff3366', // red
  '#ff9933', // orange
  '#ffcc33', // yellow
  '#33ff99', // green
  '#33ccff', // cyan
  '#3366ff', // blue
  '#9933ff', // purple
  '#ff33cc', // magenta
] as const;

export const UI_STATE_LABELS: Record<string, string> = {
  pristine: 'Pristine',
  awakening: 'Awakening',
  corrupted: 'Corrupted',
  fragmenting: 'Fragmenting',
  authenticated: 'Authenticated',
  transcendent: 'Transcendent',
};

export const CORRUPTION_THRESHOLDS = {
  clean: 0.05,
  low: 0.3,
  medium: 0.6,
  high: 0.8,
  critical: 0.95,
} as const;

export const AUDIO_FREQUENCIES = {
  pristine: 0,
  awakening: 220,
  corrupted: 110,
  fragmenting: 55,
  authenticated: 440,
  transcendent: 880,
} as const;
