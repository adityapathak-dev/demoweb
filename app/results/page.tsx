import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StatBand from "@/components/StatBand";
import TopperCard from "@/components/TopperCard";
import GrowthStories from "@/components/GrowthStories";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { RESULT_STATS, TOPPERS_2023, TOPPERS_2024 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Results & Achievements",
  description:
    "95% pass rate, 50+ school and district toppers. Explore Excel Academy's board results and student growth stories.",
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        crumb="Results"
        accent="#b6f34a"
        title={
          <>
            Results & <span className="text-gradient-signal">achievements.</span>
          </>
        }
        lede="Our students' success is our greatest achievement. Here's a look at the results we're proud of."
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <StatBand stats={RESULT_STATS} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-28">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-signal">
            2024
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            CBSE Board Results
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPPERS_2024.map((topper, i) => (
            <TopperCard key={topper.name} topper={topper} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-faint">
            2023
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            CBSE Board Results
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPPERS_2023.map((topper, i) => (
            <TopperCard key={topper.name} topper={topper} index={i} />
          ))}
        </div>
      </section>

      <GrowthStories />

      <section className="border-t border-white/10 bg-navy/50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your child could be <span className="text-gradient-signal">next.</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Join the academy that produces toppers year after year. Start with a free
              demo class today.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <MagneticButton href="/contact" variant="signal">
              Book a Free Demo Class
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
