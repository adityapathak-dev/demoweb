import Link from "next/link";
import { STORE } from "@/lib/spec";
import HeroShowcase from "./HeroShowcase";

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
 * Flagship hero — editorial serif voice on the left, drag-to-rotate atelier
 * stage on the right. Copy stays concrete: exam, lenses, price, warranty.
 */
export default function SpecHero() {
  return (
    <section aria-labelledby="hero-h" className="bg-paper pt-[100px]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:pb-24 lg:pt-16">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 rounded-lg bg-sand px-3 py-1.5 text-xs font-medium text-smoke">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            Inorbit Mall · HITEC City · {STORE.rating}★ ({STORE.reviews} reviews)
          </p>
          <h1 id="hero-h" className="mt-5 text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.05]">
            An optometrist first. <em className="text-golddeep">A frame studio</em> second.
          </h1>
          <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-smoke">
            A 20-minute digital exam before any sale — then lenses cut in-store in 45 minutes,
            from <strong className="font-semibold text-heading">₹1,499 all-in</strong> with a
            1-year warranty stamped on every pair.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/book" className="rounded-lg bg-heading px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
              Book free eye test
            </Link>
            <Link href="/shop/eyeglasses" className="rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand">
              Shop the collection
            </Link>
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["18,000+", "exams since 2016"],
              ["45 min", "lenses, cut in-store"],
              ["120+", "frames on the wall"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-xl font-semibold text-heading">{v}</dd>
                <dd className="text-xs text-smoke">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="reveal" style={{ ["--reveal-delay" as string]: "140ms" }}>
          <HeroShowcase />
        </div>
      </div>

      {/* Thin trust strip below the fold */}
      <div className="border-y border-border bg-white">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 sm:justify-between sm:px-8">
          {[
            { icon: <LensIcon />, title: "45-min in-store lenses", note: "cut while you wait" },
            { icon: <ShieldIcon />, title: "1-year warranty", note: "frames + coatings" },
            { icon: <EyeIcon />, title: "Free eye test", note: "with any frame" },
          ].map((b) => (
            <li key={b.title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-sand text-golddeep" aria-hidden>
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
