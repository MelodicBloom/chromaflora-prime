'use client';

import { useEffect, useRef } from 'react';
import { useNarrativeStore } from '@/lib/store';
import { narrativeEngine } from '@/lib/narrative';

/**
 * Maps scroll progress (0–1) to corruption level and auto-advances
 * the narrative state machine at key thresholds as the user scrolls.
 *
 * Scroll zones:
 *   0–15%   → no change  (hero, pristine)
 *   15–40%  → awakening threshold check
 *   40–70%  → corrupted threshold check
 *   70–90%  → fragmenting threshold check
 *   90–100% → authenticated threshold check
 */
export function useScrollCorruption() {
  const setCorruption = useNarrativeStore((s) => s.setCorruption);
  const uiState = useNarrativeStore((s) => s.uiState);
  const uiStateRef = useRef(uiState);
  uiStateRef.current = uiState;

  useEffect(() => {
    const ADVANCE_AT: Array<{ scrollPct: number; fromState: string }> = [
      { scrollPct: 0.15, fromState: 'pristine' },
      { scrollPct: 0.4, fromState: 'awakening' },
      { scrollPct: 0.7, fromState: 'corrupted' },
      { scrollPct: 0.9, fromState: 'fragmenting' },
    ];

    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const pct = Math.min(scrollTop / maxScroll, 1);

      // Drive corruption level directly from scroll (0.05 → 0.95)
      const corruption = 0.05 + pct * 0.9;
      setCorruption(corruption);

      // Auto-advance narrative state at scroll thresholds
      for (const { scrollPct, fromState } of ADVANCE_AT) {
        if (pct >= scrollPct && uiStateRef.current === fromState) {
          narrativeEngine.advance();
          break;
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setCorruption]);
}
