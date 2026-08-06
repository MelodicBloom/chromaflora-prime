import React from 'react';
import { ARCHIVE_ENTRIES } from '../data/content';
import { SpectralInk } from '../components/shared/SpectralInk';

export const ArchiveView = () => (
  <div className="mx-auto max-w-2xl space-y-40 py-20 pb-80">
    {ARCHIVE_ENTRIES.map((entry) => (
      <section key={entry.id} className="animate-bloom">
        <span className="mb-4 block font-mono text-[10px] tracking-[0.4em] text-accent">
          {entry.subtitle}
        </span>
        <h2 className="mb-6 font-serif text-4xl italic">{entry.title}</h2>
        <p className="mb-8 text-lg leading-relaxed text-white/60">
          {entry.text}
        </p>
        <SpectralInk>[DATA_REVEALED: The nebula remembers.]</SpectralInk>
      </section>
    ))}
  </div>
);
