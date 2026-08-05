'use client';

import { useEffect, useRef } from 'react';
import type { FluidConfig } from '@/types';

interface Props {
  config?: Partial<FluidConfig>;
}

const defaults: FluidConfig = {
  fluidColor: '#33ccff',
  blend: 3,
  intensity: 8,
  force: 1.5,
  distortion: 1.5,
  radius: 0.25,
  rainbow: true,
};

export default function TactileLiquidGlass({ config = {} }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = { ...defaults, ...config };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const point = 'touches' in e ? e.touches[0] : e;
      mouse = { x: point.clientX, y: point.clientY };
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * cfg.force * 2,
          vy: (Math.random() - 0.5) * cfg.force * 2,
          life: 0,
          maxLife: 40 + Math.random() * 40,
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as EventListener);

    let hue = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue = (hue + 0.5) % 360;

      particles = particles.filter((p) => p.life < p.maxLife);
      for (const p of particles) {
        const t = p.life / p.maxLife;
        const alpha = (1 - t) * 0.18;
        const radius = cfg.radius * canvas.width * (1 - t * 0.5);

        const color = cfg.rainbow
          ? `hsla(${(hue + p.x * 0.1) % 360}, 100%, 70%, ${alpha})`
          : `rgba(51, 204, 255, ${alpha})`;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life++;
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as EventListener);
    };
  }, [cfg.force, cfg.rainbow, cfg.radius]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ mixBlendMode: 'screen', opacity: 0.6, zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
