"use client";

import Link from "next/link";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon, ArrowUpRightIcon } from "./icons";
import { TRACKS } from "@/lib/content";
import { SUBJECT_COLORS } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * "What we teach" — a course index, not a card grid.
 * Left: the three tracks as ledger rows (ordered by school stage).
 * Right: the selected track's subjects, each with its own accent mark.
 */
export default function Tracks() {
  const [active, setActive] = useState(TRACKS[1].id);
  const track = TRACKS.find((t) => t.id === active) ?? TRACKS[0];

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="What we teach"
          title={
            <>
              Pick a track.
              <br />
              <span className="text-gradient-brand">See inside.</span>
            </>
          }
          lede="Programs built around where students are headed next — three tracks, one per stage of school."
        />
        <div>
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-pulse"
          >
            Full program details
            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        {/* track ledger */}
        <div className="h-fit lg:sticky lg:top-28">
          <div role="tablist" aria-label="Program tracks">
            {TRACKS.map((t, i) => {
              const selected = active === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "group flex w-full items-baseline gap-5 border-t border-white/10 py-6 text-left transition-colors last:border-b",
                    selected ? "border-pulse/40" : "hover:border-white/30"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm font-bold tabular-nums",
                      selected ? "text-pulse" : "text-faint"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-2xl font-bold tracking-tight transition-all duration-300 sm:text-3xl",
                        selected ? "translate-x-1 text-white" : "text-muted group-hover:text-white"
                      )}
                    >
                      {t.level}
                    </span>
                    <span className="mt-1 block max-w-sm text-sm leading-relaxed text-faint">
                      {t.blurb}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "font-display text-xs font-bold tabular-nums",
                      selected ? "text-pulse" : "text-faint"
                    )}
                  >
                    {String(t.subjects.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* subject index */}
        <div key={track.id}>
          {track.subjects.map((subject) => {
            const color = SUBJECT_COLORS[subject] ?? "#3ee2ff";
            return (
              <div key={subject}>
                <Link
                  href="/programs"
                  className="group flex items-center gap-4 border-t border-white/10 py-5 transition-colors last:border-b hover:border-pulse/30 sm:gap-6"
                >
                  <span
                    className="h-9 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:h-12"
                    style={{ background: color }}
                  />
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                      {subject}
                    </span>
                    <span className="mt-0.5 block text-xs text-faint">
                      {track.level}
                    </span>
                  </span>
                  <ArrowUpRightIcon className="shrink-0 text-xl text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pulse" />
                </Link>
              </div>
            );
          })}
          <div>
            <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-faint">
              {track.id === "competitive"
                ? "Layered on top of schoolwork — board syllabus first, entrance temperament built alongside."
                : "Every subject taught in batches of max 15, with weekly tests and doubt sessions."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
