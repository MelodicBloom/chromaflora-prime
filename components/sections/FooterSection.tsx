'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE, NAV_LINKS } from '@/lib/constants';

export function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="relative border-t border-white/5 px-4 py-16">
      <motion.div
        ref={ref}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="text-gradient-rainbow font-display text-lg font-bold">
            {SITE.name}
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            {SITE.tagline}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-text-muted transition-colors duration-200 hover:text-text-secondary"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="font-mono text-xs text-text-muted transition-colors duration-200 hover:text-text-secondary"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-mono text-xs text-text-muted">
          Built with Next.js · WebGL · Framer Motion
        </p>
      </motion.div>
    </footer>
  );
}
