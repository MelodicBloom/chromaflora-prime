import React, { useState } from 'react';
import { useChromaOS } from '../context/ChromaOS';
import { Fingerprint, Unlock } from 'lucide-react';

export const TerminalView = () => {
  const { identity, setIdentity, emitRipple } = useChromaOS();
  const [input, setInput] = useState('');
  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value.toLowerCase() === 'dark_aether') {
      setIdentity((p) => ({ ...p, isCorrupted: !p.isCorrupted }));
      setInput('');
      emitRipple(window.innerWidth / 2, window.innerHeight / 2, 5);
    }
  };
  return (
    <div className="mx-auto flex h-[60vh] max-w-md flex-col items-center justify-center space-y-12">
      <button
        type="button"
        className={`flex h-32 w-32 items-center justify-center rounded-full border border-accent/30 transition-all duration-700 ${identity.isAuthenticated ? 'scale-110 bg-accent text-black' : 'text-accent'}`}
        onClick={() => setIdentity((p) => ({ ...p, isAuthenticated: true }))}
      >
        {identity.isAuthenticated ? (
          <Unlock size={40} />
        ) : (
          <Fingerprint size={40} className="animate-pulse" />
        )}
      </button>
      <div className="glass-card w-full space-y-2 rounded-xl p-4 font-mono text-xs">
        <div className="uppercase tracking-widest text-accent">
          Protocol_Wait...
        </div>
        <input
          value={input}
          onChange={handleInput}
          placeholder="Type code..."
          className="w-full border-none bg-transparent uppercase text-white outline-none"
        />
      </div>
    </div>
  );
};
