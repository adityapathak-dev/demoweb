"use client";

import SectionHeading from "./SectionHeading";
import { GROWTH_STORIES } from "@/lib/content";

/** Percentage improvements — before/after bars, numbers set once, no animation. */
export default function GrowthStories() {
  const max = 100;
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Growth stories"
        tone="signal"
        title="From struggling to excelling."
        lede="Real transformations — the proof of our teaching method."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {GROWTH_STORIES.map((story) => (
          <div key={story.name}>
            <article className="card-lift glass rounded-3xl p-7">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{story.name}</h3>
                  <p className="text-sm text-muted">{story.context}</p>
                </div>
                <p className="font-display text-4xl font-bold tabular-nums text-signal">{story.gain}</p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Before", value: story.before, width: parseInt(story.before), dim: true },
                  { label: "After", value: story.after, width: parseInt(story.after), dim: false },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1.5 flex justify-between text-xs font-semibold tracking-wide">
                      <span className="text-faint">{bar.label}</span>
                      <span className={bar.dim ? "text-muted" : "text-signal"}>{bar.value}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={
                          bar.dim
                            ? "h-full rounded-full bg-faint/60"
                            : "h-full rounded-full bg-gradient-to-r from-brand via-pulse to-signal"
                        }
                        style={{ width: `${(bar.width / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
