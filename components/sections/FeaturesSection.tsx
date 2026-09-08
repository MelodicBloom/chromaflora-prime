'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardBody, Badge } from '@/components/ui';
import type { FeatureItem } from '@/types';

const FEATURES: FeatureItem[] = [
  {
    id: 'fluid',
    icon: '◈',
    title: 'Tactile Liquid Glass',
    description:
      'GPU-accelerated fluid simulation responds to every gesture with rainbow-spectrum displacement.',
    color: 'var(--color-rainbow-cyan)',
    delay: 0,
  },
  {
    id: 'narrative',
    icon: '◉',
    title: 'Corruption Narrative',
    description:
      'A six-state machine drives the entire interface — from pristine silence to transcendent chaos.',
    color: 'var(--color-rainbow-purple)',
    delay: 0.1,
  },
  {
    id: 'cursor',
    icon: '◎',
    title: 'Elastic Cursor',
    description:
      'Spring-physics cursor trails your movements, morphing on interactive elements.',
    color: 'var(--color-rainbow-magenta)',
    delay: 0.2,
  },
  {
    id: 'audio',
    icon: '◐',
    title: 'Spatial Audio',
    description:
      'Web Audio API synthesizes reactive tones that mirror the corruption state in real time.',
    color: 'var(--color-rainbow-green)',
    delay: 0.3,
  },
  {
    id: 'glass',
    icon: '◑',
    title: 'Glassmorphism System',
    description:
      'Layered backdrop-blur surfaces with semantic shadow tokens and reduced-transparency support.',
    color: 'var(--color-rainbow-blue)',
    delay: 0.4,
  },
  {
    id: 'tokens',
    icon: '◒',
    title: 'Design Token System',
    description:
      'Every value — color, spacing, easing, duration — lives in CSS custom properties mapped to Tailwind.',
    color: 'var(--color-rainbow-orange)',
    delay: 0.5,
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          ref={ref}
        >
          <Badge variant="cyan" className="mb-4">
            Capabilities
          </Badge>
          <h2 className="text-gradient-rainbow mb-4 font-display text-4xl font-bold md:text-5xl">
            Built Different
          </h2>
          <p className="mx-auto max-w-xl text-text-secondary">
            Every layer designed to compound — visuals, sound, narrative, and
            physics working as one system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: feature.delay,
              }}
            >
              <Card hover className="h-full p-6">
                <CardHeader>
                  <div
                    className="mb-3 text-3xl"
                    style={{ color: feature.color }}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardBody>{feature.description}</CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
