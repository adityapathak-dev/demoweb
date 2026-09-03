import type { Stat } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

/** Proof strip — oversized numerals, hairline dividers, lime for outcomes. */
export default function StatBand({ stats, tone = "signal" }: { stats: Stat[]; tone?: "signal" | "brand" }) {
  const valueCls = tone === "signal" ? "text-signal" : "text-white";
  return (
    <Reveal>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-navy/90 px-6 py-8 text-center sm:py-10">
            <dd className={`font-display text-4xl font-bold tabular-nums tracking-tight sm:text-5xl ${valueCls}`}>
              <CountUp value={stat.value} />
            </dd>
            <dt className="mt-2 text-xs tracking-[0.18em] text-muted uppercase">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
