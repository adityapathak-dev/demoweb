"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { BATCHES, SCHEDULE_NOTE, WEEK_SCHEDULE } from "@/lib/content";
import { SUBJECT_COLORS } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Batch cards + day-filterable week table. */
export default function ScheduleExplorer() {
  const [day, setDay] = useState(WEEK_SCHEDULE[0].day);
  const active = WEEK_SCHEDULE.find((d) => d.day === day) ?? WEEK_SCHEDULE[0];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {BATCHES.map((batch, i) => (
          <Reveal key={batch.name} delay={i * 70}>
            <div className="card-lift glass h-full rounded-3xl p-7">
              <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-amber">
                {batch.name}
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-white">{batch.time}</p>
              <p className="mt-1 text-sm text-muted">{batch.classes}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by day">
          {WEEK_SCHEDULE.map((d) => (
            <button
              key={d.day}
              onClick={() => setDay(d.day)}
              aria-pressed={day === d.day}
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 font-display text-[13px] font-bold transition-all duration-300",
                day === d.day
                  ? "bg-brand text-white"
                  : "border border-white/15 bg-white/5 text-muted hover:border-pulse/50 hover:text-white"
              )}
            >
              {d.day}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
          <div className="hidden grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/10 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-faint sm:grid">
            <span>Time</span>
            <span>Subject</span>
            <span>Class</span>
          </div>
          <ul key={active.day} className="divide-y divide-white/10">
            {active.rows.map((row) => (
              <li
                key={row.time + row.subject}
                className="grid gap-1.5 px-7 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[1fr_1fr_1fr] sm:items-center sm:gap-4"
              >
                <span className="font-display text-sm font-bold text-amber">{row.time}</span>
                <span className="flex items-center gap-2 text-[15px] font-semibold text-white">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: SUBJECT_COLORS[row.subject] ?? "#3ee2ff" }}
                  />
                  {row.subject}
                </span>
                <span className="text-sm text-muted">{row.className}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-muted">
          <span className="font-bold text-white">Note: </span>
          {SCHEDULE_NOTE} Contact us for the latest schedule updates.
        </p>
      </Reveal>
    </div>
  );
}
