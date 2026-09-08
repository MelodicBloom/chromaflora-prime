'use client';

import { useEffect, useRef, useState } from 'react';
import { lerp } from '@/lib/utils';

export function ElasticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setVisible(true);

    let mx = 0,
      my = 0;
    let rx = 0,
      ry = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const onEnter = () => ringRef.current?.classList.add('scale-150');
    const onLeave = () => ringRef.current?.classList.remove('scale-150');

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 h-2 w-2 rounded-full bg-rainbow-cyan mix-blend-difference"
        style={{ zIndex: 9999, willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 h-8 w-8 rounded-full border border-white/40 transition-[scale,border-color] duration-150"
        style={{ zIndex: 9998, willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}
