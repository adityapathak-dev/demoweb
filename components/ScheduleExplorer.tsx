"use client";

import { useState } from "react";
import { BATCHES, SCHEDULE_NOTE, WEEK_SCHEDULE } from "@/lib/content";
import { SUBJECT_COLORS } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Batch panels + day-filterable week table. Flat records, not glass cards. */
export default function ScheduleExplorer() {
  const [day, setDay] = useState(WEEK_SCHEDULE[0].day);
  const active = WEEK_SCHEDULE.find((d) => d.day === day) ?? WEEK_SCHEDULE[0];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {BATCHES.map((batch) => (
          <div key={batch.name}>
            <div className="card-lift h-full rounded-xl border border-white/10 bg-panel/70 p-7">
              <span aria-hidden className="block h-px w-8 bg-amber" />
              <p className="mt-4 text-sm font-semibold text-amber">
                {batch.name}
              </p>
              <p className="mt-2 font-display text-2xl font-bold tabular-nums text-white">{batch.time}</p>
              <p className="mt-1 text-sm text-muted">{batch.classes}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
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
      </div>

      <div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden grid-cols-[1fr_1fr_1fr] gap-4 border-b border-white/10 bg-white/5 px-7 py-4 text-xs font-semibold text-faint sm:grid">
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
                <span className="font-display text-sm font-bold tabular-nums text-amber">{row.time}</span>
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
      </div>

      <div>
        <p className="mt-6 max-w-[80ch] rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-muted">
          <span className="font-bold text-white">Note: </span>
          {SCHEDULE_NOTE} Contact us for the latest schedule updates.
        </p>
      </div>
    </div>
  );
}
