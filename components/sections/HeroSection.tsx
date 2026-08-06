'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { narrativeEngine } from '@/lib/narrative';
import { glitchText } from '@/lib/utils';
import { useNarrativeStore } from '@/lib/store';
import { useScrollCorruption } from '@/hooks/useScrollCorruption';
import { Button, Badge } from '@/components/ui';

const TITLE = 'CHROMAFLORA PRIME';
const SUBTITLE = 'Where code blooms into consciousness.';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export function HeroSection() {
  const corruption = useNarrativeStore((s) => s.corruption);
  const [displayTitle, setDisplayTitle] = useState(TITLE);
  const [tick, setTick] = useState(0);

  // Wire scroll → corruption for the whole page
  useScrollCorruption();

  useEffect(() => {
    if (corruption < 0.1) {
      setDisplayTitle(TITLE);
      return;
    }
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, [corruption]);

  useEffect(() => {
    if (corruption < 0.1) return;
    setDisplayTitle(glitchText(TITLE, 1 - corruption));
  }, [tick, corruption]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-rainbow-purple/10 absolute left-1/4 top-1/4 h-96 w-96 animate-blob-morph rounded-full blur-3xl" />
        <div
          className="bg-rainbow-cyan/10 absolute bottom-1/4 right-1/4 h-80 w-80 animate-blob-morph rounded-full blur-3xl"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="bg-rainbow-magenta/5 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-blob-morph rounded-full blur-3xl"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Badge variant="cyan" className="mb-6">
            Digital Garden — v1.0.0
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-gradient-rainbow mb-6 font-display font-bold tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1 }}
        >
          {displayTitle}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          {SUBTITLE}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button variant="primary" onClick={() => narrativeEngine.advance()}>
            Enter the Garden
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              document
                .getElementById('features')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore Features
          </Button>
        </motion.div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
        aria-hidden="true"
      >
        <div className="to-rainbow-cyan/50 mx-auto h-16 w-px bg-gradient-to-b from-transparent" />
      </div>
    </section>
  );
}
