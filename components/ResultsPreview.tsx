import Link from "next/link";
import SectionHeading from "./SectionHeading";
import TopperCard from "./TopperCard";
import { ArrowRightIcon } from "./icons";
import { TOPPERS_2024 } from "@/lib/content";

/** Home results teaser — full archive lives on /results. */
export default function ResultsPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The class of 2024"
          tone="signal"
          title={
            <>
              Results that
              <br />
              speak for themselves.
            </>
          }
          lede="Celebrating the hard work and dedication of our students."
        />
        <div>
          <Link
            href="/results"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-6 py-3 font-display text-sm font-bold text-signal transition-all hover:bg-signal hover:text-abyss"
          >
            View all results
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOPPERS_2024.map((topper, i) => (
          <TopperCard key={topper.name} topper={topper} index={i} />
        ))}
      </div>
    </section>
  );
}
