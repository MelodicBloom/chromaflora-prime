'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { useNarrative } from '@/hooks/useNarrative';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { uiState, corruption } = useNarrative();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const pillColor =
    corruption > 0.5
      ? {
          border: 'border-rainbow-red/40',
          text: 'text-rainbow-red',
          bg: 'bg-rainbow-red/5',
          dot: 'var(--color-rainbow-red)',
        }
      : corruption > 0.1
        ? {
            border: 'border-rainbow-orange/40',
            text: 'text-rainbow-orange',
            bg: 'bg-rainbow-orange/5',
            dot: 'var(--color-rainbow-orange)',
          }
        : {
            border: 'border-rainbow-cyan/40',
            text: 'text-rainbow-cyan',
            bg: 'bg-rainbow-cyan/5',
            dot: 'var(--color-rainbow-cyan)',
          };

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-[200] transition-all duration-500',
          scrolled
            ? 'bg-bg-primary/80 border-b border-white/5 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-gradient-rainbow font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
            onClick={closeMenu}
          >
            {SITE.name}
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right side: state pill + hamburger */}
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'hidden items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-all duration-500 sm:inline-flex',
                pillColor.border,
                pillColor.text,
                pillColor.bg
              )}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: pillColor.dot }}
              />
              {uiState.toUpperCase()}
            </span>

            {/* Hamburger — mobile only */}
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/5 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <motion.span
                className="block h-px w-5 bg-text-primary"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-5 bg-text-primary"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-px w-5 bg-text-primary"
                animate={
                  menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              className="fixed left-0 right-0 top-16 z-[195] md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="bg-bg-secondary/90 mx-4 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl">
                <ul role="list" className="p-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                          onClick={closeMenu}
                        >
                          {link.label}
                          <span className="text-xs text-text-muted">↗</span>
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="flex items-center rounded-xl px-4 py-3.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>

                {/* State indicator in drawer */}
                <div className="border-t border-white/5 px-6 py-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 font-mono text-xs',
                      pillColor.text
                    )}
                  >
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full"
                      style={{ background: pillColor.dot }}
                    />
                    {uiState.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
