import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TopperCard from "./TopperCard";
import { TOPPERS_2024 } from "@/lib/content";

/** Home results teaser — full archive lives on /results. */
export default function ResultsPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The class of 2024"
          tone="signal"
          title={
            <>
              Results that <span className="serif-accent text-gradient-signal">speak.</span>
            </>
          }
          lede="Celebrating the hard work and dedication of our students."
        />
        <Reveal delay={150}>
          <Link
            href="/results"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-6 py-3 font-display text-sm font-bold text-signal transition-all hover:bg-signal hover:text-abyss"
          >
            View all results
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOPPERS_2024.map((topper, i) => (
          <TopperCard key={topper.name} topper={topper} index={i} />
        ))}
      </div>
    </section>
  );
}
