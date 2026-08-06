import React, { useRef, useEffect } from 'react';
import { useChromaOS } from '../../context/ChromaOS';

export const CanvasView = () => {
  const canvasRef = useRef(null);
  const { identity } = useChromaOS();
  const state = useRef({ ripples: [], stars: [] });
  const rafId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const res = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      state.current.stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2,
      }));
    };
    const handleRipple = (e) =>
      state.current.ripples.push({
        x: e.detail.x,
        y: e.detail.y,
        r: 0,
        a: 1,
        p: e.detail.power,
      });
    window.addEventListener('nebula-ripple', handleRipple);
    window.addEventListener('resize', res);
    res();
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      g.addColorStop(0, `hsla(${identity.hue}, 80%, 10%, 0.4)`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      state.current.stars.forEach((s) => {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(s.x, s.y, s.s, s.s);
      });
      state.current.ripples.forEach((rp) => {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${identity.hue}, 100%, 70%, ${rp.a})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        rp.r += 4 * rp.p;
        rp.a -= 0.015;
      });
      state.current.ripples = state.current.ripples.filter((rp) => rp.a > 0);
      rafId.current = requestAnimationFrame(draw);
    };
    rafId.current = requestAnimationFrame(draw);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('nebula-ripple', handleRipple);
      window.removeEventListener('resize', res);
    };
  }, [identity.hue]);
  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
  );
};
