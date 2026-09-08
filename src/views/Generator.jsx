import React from 'react';
import { useChromaOS } from '../context/ChromaOS';
import { Zap } from 'lucide-react';

export const GeneratorView = () => {
  const { identity, setIdentity, emitRipple } = useChromaOS();
  return (
    <div className="animate-bloom mx-auto max-w-xl space-y-12">
      <h1 className="text-5xl font-black italic tracking-tighter">
        Identity <span className="text-accent">Engine</span>
      </h1>
      <div className="glass-card fresnel-border space-y-8 rounded-3xl p-10">
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-xs text-accent">
            <span>AETHER_HUE</span>
            <span>{identity.hue}</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={identity.hue}
            onChange={(e) =>
              setIdentity((p) => ({ ...p, hue: Number(e.target.value) }))
            }
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-xs text-accent">
            <span>GLOW_INTENSITY</span>
            <span>{Math.round(identity.glow * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={identity.glow}
            onChange={(e) =>
              setIdentity((p) => ({ ...p, glow: Number(e.target.value) }))
            }
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
          />
        </div>
        <button
          onClick={(e) => emitRipple(e.clientX, e.clientY, 3)}
          className="w-full rounded-xl border border-white/10 py-4 font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/5"
        >
          <Zap className="mr-2 inline" size={14} /> Trigger Impulse
        </button>
      </div>
    </div>
  );
};
