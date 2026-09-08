'use client';

import { useEffect, useRef } from 'react';
import { useNarrativeStore } from '@/lib/store';

export function CorruptionOverlay() {
  const corruption = useNarrativeStore((s) => s.corruption);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (corruption >= 0.05) {
        // Scanlines
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.fillStyle = `rgba(0,0,0,${0.05 * corruption})`;
          ctx.fillRect(0, y, canvas.width, 2);
        }

        // Glitch slices
        const sliceCount = Math.floor(corruption * 8);
        for (let i = 0; i < sliceCount; i++) {
          if (Math.random() > 0.3) continue;
          const y = Math.random() * canvas.height;
          const h = Math.random() * 4 + 1;
          const offset = (Math.random() - 0.5) * 30 * corruption;
          ctx.drawImage(
            canvas,
            0,
            y,
            canvas.width,
            h,
            offset,
            y,
            canvas.width,
            h
          );
        }

        // RGB aberration
        if (corruption > 0.4) {
          const ab = corruption * 4;
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = `rgba(255,0,0,${0.03 * corruption})`;
          ctx.fillRect(-ab, 0, canvas.width, canvas.height);
          ctx.fillStyle = `rgba(0,0,255,${0.03 * corruption})`;
          ctx.fillRect(ab, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [corruption]);

  if (corruption < 0.05) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 2, mixBlendMode: 'multiply', opacity: corruption }}
      aria-hidden="true"
    />
  );
}
