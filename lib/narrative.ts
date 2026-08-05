'use client';

import { useNarrativeStore } from './store';
import { playTone } from './audio';
import type { UIState, NarrativeListener } from '@/types';

class NarrativeEngine {
  private listeners: Set<NarrativeListener> = new Set();
  private unsubscribeStore: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.unsubscribeStore = useNarrativeStore.subscribe(
        (state) => state.uiState,
        (uiState) => {
          this.emit(uiState);
          this.onStateChange(uiState);
        }
      );
    }
  }

  subscribe(listener: NarrativeListener): () => void {
    this.listeners.add(listener);
    listener(useNarrativeStore.getState().uiState);
    return () => this.listeners.delete(listener);
  }

  private emit(state: UIState): void {
    this.listeners.forEach((fn) => fn(state));
  }

  private onStateChange(state: UIState): void {
    const tones: Partial<Record<UIState, number>> = {
      awakening: 220,
      corrupted: 110,
      fragmenting: 55,
      authenticated: 440,
      transcendent: 880,
    };
    const freq = tones[state];
    if (freq) playTone(freq, 0.3, 'sine');

    const corruptionMap: Record<UIState, number> = {
      pristine: 0,
      awakening: 0.1,
      corrupted: 0.5,
      fragmenting: 0.85,
      authenticated: 0.2,
      transcendent: 0,
    };
    useNarrativeStore.getState().setCorruption(corruptionMap[state]);
  }

  advance() {
    useNarrativeStore.getState().advance();
  }
  getState(): UIState {
    return useNarrativeStore.getState().uiState;
  }
  getCorruption(): number {
    return useNarrativeStore.getState().corruption;
  }
  destroy() {
    this.listeners.clear();
    this.unsubscribeStore?.();
  }
}

export const narrativeEngine = new NarrativeEngine();
