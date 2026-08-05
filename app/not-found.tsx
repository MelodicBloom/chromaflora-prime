import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="max-w-md text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#33ccff]">
          Error 404
        </p>
        <h1
          className="mb-4 font-bold text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          Page Not Found
        </h1>
        <p className="mb-8 leading-relaxed text-[#a0a0b0]">
          This node does not exist in the garden.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#33ccff]/50 px-8 py-3 font-mono text-sm tracking-widest text-[#33ccff] transition-colors duration-300 hover:bg-[#33ccff]/10"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
