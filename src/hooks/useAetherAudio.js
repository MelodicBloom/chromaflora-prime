import { useEffect, useRef } from 'react';
export const useAetherAudio = () => {
  const ctx = useRef(null);
  useEffect(() => {
    const init = () => {
      if (ctx.current) return;
      ctx.current = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.current.createOscillator();
      const gain = ctx.current.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 55;
      gain.gain.value = 0.02;
      osc.connect(gain);
      gain.connect(ctx.current.destination);
      osc.start();
    };
    window.addEventListener('start-audio', init);
    return () => window.removeEventListener('start-audio', init);
  }, []);
};
