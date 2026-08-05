import React, { useState, useEffect, useRef } from 'react';
export const SpectralInk = ({ children }) => {
  const ref = useRef(null);
  const [b, setB] = useState(0);
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const d = Math.hypot(
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2)
      );
      setB(Math.max(0, 1 - d / 200));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <span
      ref={ref}
      style={{
        color: `rgba(255,255,255,${b})`,
        textShadow: `0 0 ${b * 15}px var(--accent)`,
        filter: `blur(${(1 - b) * 10}px)`,
        transition: 'all 0.1s',
      }}
      className="font-serif italic text-accent"
    >
      {children}
    </span>
  );
};
