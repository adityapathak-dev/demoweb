"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "./Reveal";
import { ArrowRightIcon, ClockIcon, SparkIcon, UsersIcon } from "./icons";
import { PROGRAMS } from "@/lib/content";
import { CLASS_COLORS, SUBJECT_COLORS } from "@/lib/theme";
import { cn } from "@/lib/utils";

const FILTERS = ["All Classes", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

/** Filterable program ledger — one row per class, accent-coded. */
export default function ProgramsExplorer() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const visible =
    filter === FILTERS[0] ? PROGRAMS : PROGRAMS.filter((p) => p.className === filter);

  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by class">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full px-5 py-2.5 font-display text-[13px] font-bold transition-all duration-300",
                filter === f
                  ? "bg-brand text-white shadow-[0_10px_30px_-8px_rgba(47,107,255,0.8)]"
                  : "border border-white/15 bg-white/5 text-muted hover:border-pulse/50 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 space-y-5">
        {visible.map((program, i) => {
          const accent = CLASS_COLORS[program.className] ?? "#3ee2ff";
          return (
            <Reveal key={program.className} delay={Math.min(i, 3) * 60}>
              <article
                className="card-lift glass relative overflow-hidden rounded-3xl p-7 sm:p-9"
                style={{ borderTop: `2px solid ${accent}` }}
              >
                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-3.5 py-1 font-display text-xs font-bold"
                        style={{ background: `${accent}22`, color: accent }}
                      >
                        {program.className}
                      </span>
                      {program.modes.map((mode) => (
                        <span
                          key={mode}
                          className="rounded-full border border-white/15 px-3.5 py-1 text-xs font-semibold text-muted"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 leading-relaxed text-muted">{program.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {program.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: SUBJECT_COLORS[subject] ?? "#3ee2ff" }}
                          />
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2.5 border-t border-white/10 pt-5 text-sm lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <p className="flex items-center gap-2.5 text-white">
                      <ClockIcon className="shrink-0 text-base text-faint" /> {program.timing}
                    </p>
                    <p className="flex items-center gap-2.5 text-muted">
                      <UsersIcon className="shrink-0 text-base text-faint" /> {program.batch}
                    </p>
                    <p className="flex items-center gap-2.5 font-semibold" style={{ color: accent }}>
                      <SparkIcon className="shrink-0 text-base" /> {program.highlight}
                    </p>
                    <Link
                      href="/contact"
                      className="btn-sheen group mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 font-display text-[13px] font-bold text-white transition-colors hover:bg-white/20"
                    >
                      Enquire Now{" "}
                      <ArrowRightIcon className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
