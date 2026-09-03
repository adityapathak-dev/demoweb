import Link from "next/link";

/** 404 — on-brand, with somewhere useful to go. */
export default function NotFound() {
  return (
    <div className="relative grid min-h-[80svh] place-items-center overflow-hidden px-5 pt-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]"
      />
      <div className="relative max-w-md">
        <p className="font-display text-7xl font-bold tracking-tight text-white/10 sm:text-8xl">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          This page isn&apos;t in the syllabus.
        </h1>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist — but the right class for
          you does.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-brand px-7 py-3 font-display text-sm font-bold text-white transition-colors hover:bg-[#4a82ff]"
          >
            Back home
          </Link>
          <Link
            href="/programs"
            className="rounded-full border border-white/20 px-7 py-3 font-display text-sm font-bold text-white"
          >
            Explore programs
          </Link>
        </div>
      </div>
    </div>
  );
}
