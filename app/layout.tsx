import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'ChromaFlora Prime — Immersive Digital Garden',
    template: '%s | ChromaFlora Prime',
  },
  description:
    'An immersive digital garden where code blooms into consciousness. Experience fluid glass, spectral ink, and corruption-driven narrative.',
  keywords: [
    'immersive UI',
    'WebGL',
    'glassmorphism',
    'interactive narrative',
    'digital garden',
    'ChromaFlora',
  ],
  authors: [{ name: 'ChromaFlora' }],
  creator: 'ChromaFlora',
  publisher: 'ChromaFlora',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chromaflora.prime',
    siteName: 'ChromaFlora Prime',
    title: 'ChromaFlora Prime',
    description:
      'An immersive digital garden where code blooms into consciousness.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChromaFlora Prime — Immersive Digital Garden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChromaFlora Prime',
    description:
      'An immersive digital garden where code blooms into consciousness.',
    images: ['/og-image.jpg'],
    creator: '@chromaflora',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: 'https://chromaflora.prime' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#e0e0e0' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
};

const criticalCSS = `
  :root {
    --color-bg-primary: #0a0a0f;
    --color-text-primary: #f0f0f5;
    --font-family-primary: 'Inter', system-ui, sans-serif;
  }
  html { background-color: var(--color-bg-primary); color: var(--color-text-primary); }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body
        className="min-h-screen bg-bg-primary text-text-primary antialiased"
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-rainbow-cyan focus:px-4 focus:py-2 focus:font-medium focus:text-black"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
