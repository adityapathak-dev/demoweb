import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScheduleExplorer from "@/components/ScheduleExplorer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Weekly Schedule",
  description:
    "View Excel Academy's regular weekly class timings. Morning, afternoon and evening batches, Monday through Saturday.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        crumb="Schedule"
        accent="#ffb020"
        title={
          <>
            Weekly <span className="text-gradient-brand">schedule.</span>
          </>
        }
        lede="View our regular weekly class timings. All batches run Monday through Saturday."
      />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <ScheduleExplorer />
      </section>
      <section className="border-t border-white/10 bg-navy/50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Timing doesn&apos;t work for you?
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              We can arrange flexible timings or online classes. Get in touch and
              we&apos;ll find a slot that works.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-4">
            <MagneticButton href="/contact">Contact Us</MagneticButton>
            <MagneticButton href="/programs" variant="ghost">
              Browse programs
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
