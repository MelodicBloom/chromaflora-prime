'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ChromaFlora] Runtime error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="max-w-md text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#ff3366]">
          System Error
        </p>
        <h1
          className="mb-4 font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          Corruption Detected
        </h1>
        <p className="mb-2 font-mono text-sm leading-relaxed text-[#a0a0b0]">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && (
          <p className="mb-8 font-mono text-xs text-[#606070]">
            digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-[#ff3366]/50 px-8 py-3 font-mono text-sm tracking-widest text-[#ff3366] transition-colors duration-300 hover:bg-[#ff3366]/10"
        >
          Attempt Recovery
        </button>
      </div>
    </div>
  );
}
