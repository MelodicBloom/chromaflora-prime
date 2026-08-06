'use client';

import { useEffect, useState } from 'react';
import { useNarrativeStore } from '@/lib/store';
import { narrativeEngine } from '@/lib/narrative';
import { sleep } from '@/lib/utils';

const BOOT_LINES = [
  'CHROMAFLORA PRIME v1.0.0',
  'Initializing neural substrate...',
  'Loading consciousness matrix... [OK]',
  'Calibrating spectral sensors... [OK]',
  'Establishing fluid dynamics... [OK]',
  'WARNING: Corruption detected in sector 7',
  'Attempting recovery...',
  '> AUTHENTICATION REQUIRED',
];

export function AuthenticationSequence() {
  const uiState = useNarrativeStore((s) => s.uiState);
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (uiState !== 'pristine') return;
    let cancelled = false;

    const run = async () => {
      for (const line of BOOT_LINES) {
        if (cancelled) return;
        await sleep(300 + Math.random() * 200);
        setLines((prev) => [...prev, line]);
      }
      await sleep(800);
      if (!cancelled) setDone(true);
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [uiState]);

  const handleAuth = async () => {
    setDismissed(true);
    await sleep(400);
    narrativeEngine.advance();
  };

  if (dismissed || (uiState !== 'pristine' && uiState !== 'awakening'))
    return null;

  return (
    <div
      className="bg-bg-primary/95 fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      style={{ zIndex: 500 }}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication sequence"
    >
      <div className="glass-card mx-4 w-full max-w-lg p-8 font-mono text-sm">
        <div className="mb-6 space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('WARNING') || line.startsWith('>')
                  ? 'text-rainbow-red'
                  : 'text-rainbow-green'
              }
            >
              {line}
            </div>
          ))}
          {!done && (
            <span className="inline-block h-4 w-2 animate-pulse bg-rainbow-cyan" />
          )}
        </div>

        {done && (
          <button
            onClick={handleAuth}
            className="hover:bg-rainbow-cyan/10 w-full rounded-lg border border-rainbow-cyan py-3 text-xs font-semibold uppercase tracking-widest text-rainbow-cyan transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rainbow-cyan"
            autoFocus
          >
            Initialize
          </button>
        )}
      </div>
    </div>
  );
}
