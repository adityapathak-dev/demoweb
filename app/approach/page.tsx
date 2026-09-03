import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { CheckIcon } from "@/components/icons";
import { FOUNDER, MILESTONES, PILLARS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Founded by Rajendra Sharma on a simple belief — every student can excel with the right guidance and individual attention.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumb="Our Approach"
        accent="#8b5cf6"
        title={
          <>
            Our <span className="text-gradient-brand">story.</span>
          </>
        }
        lede="Excel Academy was founded with a simple belief — every student can excel with the right guidance and individual attention."
      />

      {/* founder — editorial split */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <div className="glass grain relative overflow-hidden rounded-[2rem] p-10 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-mind/30 blur-[80px]"
            />
            <span className="relative mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-brand via-mind to-magenta font-display text-3xl font-bold text-white shadow-[0_20px_60px_-15px_rgba(139,92,246,0.7)]">
              RS
            </span>
            <h2 className="relative mt-6 font-display text-2xl font-bold text-white">
              {FOUNDER.name}
            </h2>
            <p className="relative mt-1 text-sm tracking-[0.18em] text-mind uppercase">
              {FOUNDER.role}
            </p>
            <div className="relative mt-6 flex flex-wrap justify-center gap-2">
              {FOUNDER.credentials.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="space-y-5">
          {FOUNDER.bio.map((para, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className={i === 0 ? "font-display text-xl leading-relaxed text-white first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-pulse sm:text-2xl" : "leading-relaxed text-muted"}>
                {para}
              </p>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <blockquote className="border-l-2 border-mind pl-6 font-display text-lg italic leading-relaxed text-white sm:text-xl">
              “{FOUNDER.philosophy}”
              <footer className="mt-2 text-sm not-italic text-faint">
                — Teaching philosophy
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-mind">
            Why parents choose us
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Built for serious learning.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal as="li" key={pillar} delay={(i % 2) * 80}>
              <div className="card-lift glass flex h-full gap-4 rounded-2xl p-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mind/15 text-base text-mind">
                  <CheckIcon />
                </span>
                <p className="leading-relaxed text-white/90">{pillar}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* milestones — vertical timeline */}
      <section className="border-y border-white/10 bg-navy/50">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-pulse">
              Academy journey
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Milestones.
            </h2>
          </Reveal>
          <ol className="relative mt-12 space-y-0 border-l border-white/15 pl-0">
            {MILESTONES.map((m, i) => (
              <Reveal as="li" key={m.year + m.body} delay={Math.min(i, 4) * 50}>
                <div className="relative pb-10 pl-10 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute left-[-7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-abyss"
                    style={{
                      background: i === MILESTONES.length - 1 ? "#b6f34a" : "#2f6bff",
                      boxShadow: `0 0 16px ${i === MILESTONES.length - 1 ? "#b6f34a" : "#2f6bff"}`,
                    }}
                  />
                  <p className="font-display text-xl font-bold text-white">{m.year}</p>
                  <p className="mt-1 max-w-2xl leading-relaxed text-muted">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Start with a <span className="text-gradient-brand">free demo class.</span>
          </h2>
          <p className="mt-3 text-muted">
            Experience our teaching approach firsthand. No commitment required.
          </p>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-4">
          <MagneticButton href="/contact">Book a Demo</MagneticButton>
          <MagneticButton href="/schedule" variant="ghost">
            View schedule
          </MagneticButton>
        </Reveal>
      </section>
    </>
  );
}
