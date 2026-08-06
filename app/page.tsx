'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ShowcaseSection } from '@/components/sections/ShowcaseSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { initAudio } from '@/lib/audio';
import { narrativeEngine } from '@/lib/narrative';
import type { UIState } from '@/types';

const TactileLiquidGlass = dynamic(
  () => import('@/components/effects/TactileLiquidGlass'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-bg-primary/50 fixed inset-0 backdrop-blur-sm" />
    ),
  }
);

const ElasticCursor = dynamic(
  () =>
    import('@/components/effects/ElasticCursor').then((m) => m.ElasticCursor),
  { ssr: false }
);

const CorruptionOverlay = dynamic(
  () =>
    import('@/components/effects/CorruptionOverlay').then(
      (m) => m.CorruptionOverlay
    ),
  { ssr: false }
);

const AuthenticationSequence = dynamic(
  () =>
    import('@/components/effects/AuthenticationSequence').then(
      (m) => m.AuthenticationSequence
    ),
  { ssr: false }
);

function AudioInitializer() {
  useEffect(() => {
    const handleFirstInteraction = () => initAudio();
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, {
      once: true,
    });
    document.addEventListener('keydown', handleFirstInteraction, {
      once: true,
    });
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);
  return null;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [uiState, setUiState] = useState<UIState>('pristine');

  useEffect(() => {
    setMounted(true);
    const unsubscribe = narrativeEngine.subscribe((state) => setUiState(state));
    return () => unsubscribe();
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rainbow-cyan border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <AudioInitializer />
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <Suspense fallback={null}>
          <TactileLiquidGlass
            config={{
              fluidColor: '#33ccff',
              blend: 3,
              intensity: 8,
              force: 1.5,
              distortion: 1.5,
              radius: 0.25,
              rainbow: true,
            }}
          />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <CorruptionOverlay />
      </Suspense>
      <Suspense fallback={null}>
        <AuthenticationSequence />
      </Suspense>
      <Suspense fallback={null}>
        <ElasticCursor />
      </Suspense>
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <FooterSection />
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-[1000] rounded-lg bg-black/80 px-3 py-2 font-mono text-xs text-white/60 backdrop-blur-sm">
          State: {uiState}
        </div>
      )}
    </>
  );
}
