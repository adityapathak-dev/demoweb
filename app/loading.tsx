/** Route loading state — brand pulse, no spinners-from-nowhere. */
export default function Loading() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 pt-24" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col items-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand via-brand-deep to-mind font-display text-lg font-bold text-white">
          EA
        </span>
        <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-pulse to-transparent bg-[length:200%_100%]" />
        </div>
        <p className="mt-4 text-xs tracking-[0.3em] text-faint uppercase">Loading</p>
      </div>
    </div>
  );
}
