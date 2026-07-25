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
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const pillColor =
    corruption > 0.5
      ? { border: 'border-rainbow-red/40', text: 'text-rainbow-red', bg: 'bg-rainbow-red/5', dot: 'var(--color-rainbow-red)' }
      : corruption > 0.1
      ? { border: 'border-rainbow-orange/40', text: 'text-rainbow-orange', bg: 'bg-rainbow-orange/5', dot: 'var(--color-rainbow-orange)' }
      : { border: 'border-rainbow-cyan/40', text: 'text-rainbow-cyan', bg: 'bg-rainbow-cyan/5', dot: 'var(--color-rainbow-cyan)' };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[200] transition-all duration-500',
          scrolled ? 'backdrop-blur-xl bg-bg-primary/80 border-b border-white/5' : 'bg-transparent'
        )}
      >
        <nav
          className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-gradient-rainbow text-lg tracking-tight hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            {SITE.name}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm font-medium"
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
                'hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all duration-500',
                pillColor.border, pillColor.text, pillColor.bg
              )}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: pillColor.dot }}
              />
              {uiState.toUpperCase()}
            </span>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <motion.span
                className="w-5 h-px bg-text-primary block"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-px bg-text-primary block"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="w-5 h-px bg-text-primary block"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
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
              className="fixed top-16 left-0 right-0 z-[195] md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="mx-4 rounded-2xl backdrop-blur-xl bg-bg-secondary/90 border border-white/10 overflow-hidden">
                <ul role="list" className="p-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors text-sm font-medium"
                          onClick={closeMenu}
                        >
                          {link.label}
                          <span className="text-text-muted text-xs">↗</span>
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="flex items-center px-4 py-3.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors text-sm font-medium"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>

                {/* State indicator in drawer */}
                <div className="px-6 py-3 border-t border-white/5">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-mono',
                      pillColor.text
                    )}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
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
