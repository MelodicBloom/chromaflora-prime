export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#33ccff] border-t-transparent" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#606070]">
          Loading
        </p>
      </div>
    </div>
  );
}
