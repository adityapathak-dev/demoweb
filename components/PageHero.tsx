import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Inner-page header — breadcrumb + oversized title + lede.
 * Editorial, not card-based; each route tints it with its own accent.
 */
export default function PageHero({
  crumb,
  title,
  lede,
  accent = "#3ee2ff",
}: {
  crumb: string;
  title: React.ReactNode;
  lede: string;
  accent?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-40%] h-[26rem] w-[46rem] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: `${accent}26` }}
        />
        <div className="dot-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase">
            <Link href="/" className="text-faint transition-colors hover:text-white">
              Home
            </Link>
            <span aria-hidden className="text-faint">
              /
            </span>
            <span style={{ color: accent }}>{crumb}</span>
          </nav>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[1.02] tracking-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {lede}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
