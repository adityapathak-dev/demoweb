"use client";

import Link from "next/link";

/** Route error state — recovery, not a dead end. */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 pt-24 text-center">
      <div className="max-w-md">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s get you back on track.
        </h1>
        <p className="mt-4 text-muted">
          An unexpected error interrupted this page. Try again, or head home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-brand px-7 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-[#4a82ff]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-7 py-3 font-display text-sm font-bold text-white"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
