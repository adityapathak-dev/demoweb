import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/lib/spec";

function LensIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
      <path d="m9.5 11.5 2 2 3.5-4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * Full-width hero: real store photo at full bleed, copy docked on a solid
 * white card (no text-on-photo, no gradient scrims). Trust strip sits below
 * the fold as a thin icon row.
 */
export default function SpecHero() {
  return (
    <section aria-labelledby="hero-h" className="bg-white pt-[100px]">
      <div className="relative">
        <div className="relative h-[62vh] min-h-[440px] w-full overflow-hidden lg:h-[78vh]">
          <Image
            src="/frames/hero.jpg"
            alt="Customer browsing the wall of frames inside the SPEC store"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Copy card — solid white, docked left */}
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-5 sm:px-8">
            <div className="reveal max-w-xl rounded-2xl bg-white p-7 shadow-[0_16px_48px_rgba(0,0,0,0.16)] sm:p-9">
              <p className="inline-flex items-center gap-2 rounded-lg bg-sand px-3 py-1.5 text-xs font-medium text-smoke">
                <span className="h-1.5 w-1.5 rounded-full bg-heading" aria-hidden />
                Inorbit Mall · HITEC City · {STORE.rating}★ ({STORE.reviews} reviews)
              </p>
              <h1 id="hero-h" className="mt-4 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.1]">
                Eyes checked properly. Glasses ready today.
              </h1>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-smoke">
                A 20-minute digital exam comes before any sale here — then same-day lenses from{" "}
                <strong className="font-semibold text-heading">₹1,499 all-in</strong>, with a 1-year warranty on
                every pair.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/book" className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
                  Book free eye test
                </Link>
                <Link href="/collections" className="rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand">
                  Try 5 at home — free
                </Link>
              </div>
            </div>
          </div>
          {/* Scroll cue */}
          <a
            href="#collections"
            aria-label="Scroll to collections"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-medium text-ink shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 sm:flex"
          >
            <span aria-hidden className="block animate-bounce text-sm leading-none">↓</span>
            Browse the shelf
          </a>
          {/* Shoppable product tag — the hero's dynamic showcase element:
              a live frame pinned to the photo, gently levitating via
              [data-depth] (frozen under prefers-reduced-motion). */}
          <Link
            href="/book?frame=SP-CL01"
            data-depth="40"
            aria-label="Try the Madhapur Wayfarer Classic at home — 2,299 rupees"
            className="absolute bottom-5 right-5 flex items-center gap-3 rounded-xl bg-white/95 py-2 pl-2 pr-4 shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur transition-transform hover:-translate-y-0.5 sm:right-8"
          >
            <span className="relative block h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-sand">
              <Image
                src="/frames/sp-classic.jpg"
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-xs font-semibold text-heading">Wayfarer Classic · ₹2,299</span>
              <span className="mt-0.5 block text-[11px] font-medium text-smoke underline underline-offset-2">
                Try at home — free →
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Thin trust strip below the fold */}
      <div className="border-b border-border bg-white">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 sm:justify-between sm:px-8">
          {[
            { icon: <LensIcon />, title: "45-min in-store lenses", note: "cut while you wait" },
            { icon: <ShieldIcon />, title: "1-year warranty", note: "frames + coatings" },
            { icon: <EyeIcon />, title: "Free eye test", note: "with any frame" },
          ].map((b) => (
            <li key={b.title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-sand text-heading" aria-hidden>
                {b.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold text-heading">{b.title}</span>
                <span className="block text-xs text-smoke">{b.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
