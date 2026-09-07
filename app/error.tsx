"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 pt-24 text-center">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-normal text-smoke">
          Something went wrong
        </p>
        <h1 className="mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-tight text-heading">
          Let&apos;s get you back on track.
        </h1>
        <p className="mt-4 text-smoke">
          An unexpected error interrupted this page. Try again, or head home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-border bg-white px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}