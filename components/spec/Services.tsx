import Link from "next/link";
import { SERVICES, STORE } from "@/lib/spec";

function ExamIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.5 13.5 6.5 6.5" />
      <path d="M6.5 9h5M9 6.5v5" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
    </svg>
  );
}

function DropIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    </svg>
  );
}

const ICONS = [ExamIcon, LabIcon, HomeIcon, DropIcon];

/**
 * Eye-care as a horizontal icon-row (desktop) / stacked timeline (mobile),
 * with the trust stats set big — they were under-designed before.
 */
export default function SpecServices() {
  return (
    <section aria-labelledby="care-h" className="border-b border-border bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="reveal text-xs font-medium uppercase tracking-normal text-smoke">05 — Eye care, not sales care</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 id="care-h" className="reveal max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
            An optometrist runs this floor. The cashier doesn&apos;t guess your power.
          </h2>
          <p className="reveal max-w-sm text-sm leading-relaxed text-smoke">
            Every service has a fixed price on the wall — the same one you&apos;ll hear at the counter.
          </p>
        </div>

        {/* Prominent stat band */}
        <dl className="reveal mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            [STORE.examsDone, "exams done since 2016"],
            [`${STORE.rating}★`, `${STORE.reviews} verified reviews`],
            ["45 min", "single-vision lenses, cut in-store"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-sand px-6 py-5 text-center sm:text-left">
              <dd className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-none text-heading">{v}</dd>
              <dt className="mt-1.5 text-sm text-smoke">{l}</dt>
            </div>
          ))}
        </dl>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={s.n} className="reveal relative" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                {i < SERVICES.length - 1 && (
                  <span aria-hidden className="absolute left-12 right-[-2rem] top-6 hidden h-px bg-border lg:block" />
                )}
                <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-sand text-heading">
                  <Icon />
                </span>
                <p className="mt-4 text-xs font-medium text-smoke">{s.n}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-heading">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-smoke">{s.copy}</p>
                <p className="mt-3 inline-block rounded-lg border border-border px-3 py-1 text-xs font-medium text-ink">{s.meta}</p>
                <p className="mt-2">
                  <Link href="/book" className="text-[13px] font-medium text-ink underline underline-offset-2 hover:text-smoke">
                    Book →
                  </Link>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
