'use client';

import { useAudioStore } from '@/lib/store';
import { initAudio, setVolume, playTone } from '@/lib/audio';

/**
 * Hook for audio state and controls.
 * Safe to call before audio is initialized — all operations no-op until ready.
 */
export function useAudio() {
  const initialized = useAudioStore((s) => s.initialized);
  const enabled = useAudioStore((s) => s.enabled);
  const volume = useAudioStore((s) => s.volume);
  const analyserData = useAudioStore((s) => s.analyserData);

  const init = () => initAudio();
  const updateVolume = (v: number) => setVolume(v);
  const tone = (freq: number, dur?: number) => playTone(freq, dur);

  // Derive a single normalised energy value 0-1 from analyser data
  const energy = analyserData
    ? Array.from(analyserData).reduce((a, b) => a + b, 0) /
      (analyserData.length * 255)
    : 0;

  return {
    initialized,
    enabled,
    volume,
    analyserData,
    energy,
    init,
    updateVolume,
    tone,
  };
}
