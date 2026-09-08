import React from 'react';
import { useChromaOS } from '../../context/ChromaOS';

export const LiquidButton = ({ children }) => {
  const { emitRipple } = useChromaOS();
  return (
    <div className="group relative">
      <button
        onClick={(e) => emitRipple(e.clientX, e.clientY, 2)}
        className="relative z-10 rounded-full bg-accent px-6 py-2 font-bold uppercase tracking-widest text-black transition-transform active:scale-95"
      >
        {children}
      </button>
      <div className="gooey-filter pointer-events-none absolute inset-0 opacity-0 transition-all group-hover:opacity-100">
        <div className="absolute left-1/4 top-0 h-6 w-6 rounded-full bg-accent transition-all duration-500 group-hover:-translate-y-8" />
        <div className="absolute right-1/4 top-0 h-4 w-4 rounded-full bg-accent transition-all duration-700 group-hover:-translate-y-6" />
      </div>
    </div>
  );
};
