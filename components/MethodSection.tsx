"use client";

import SectionHeading from "./SectionHeading";
import MethodCanvas from "./three/MethodCanvas";
import { METHOD_STEPS } from "@/lib/content";

const STEP_COLORS = ["#2f5bf5", "#3ee2ff", "#b6f34a", "#ff7a59"];

/** "How we teach" — immersive split: living 3D mechanism + method ledger. */
export default function MethodSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy/50">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-mind/15 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Our approach, in order"
            tone="mind"
            title="How we teach."
            lede="A structured 4-step learning cycle that builds deep understanding and exam confidence."
          />
          <ol className="mt-10 space-y-6">
            {METHOD_STEPS.map((step, i) => (
              <li key={step.index}>
                <div className="flex gap-5">
                  <span
                    className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-xs font-bold tabular-nums text-white"
                    style={{ background: STEP_COLORS[i], boxShadow: `0 8px 24px -6px ${STEP_COLORS[i]}` }}
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative">
          <div className="glass grain relative overflow-hidden rounded-[2rem] p-4">
            <MethodCanvas />
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-1">
              <p className="text-xs font-semibold text-faint">
                The Excel learning cycle
              </p>
              <div className="flex gap-2">
                {METHOD_STEPS.map((step, i) => (
                  <span
                    key={step.index}
                    title={step.title}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: STEP_COLORS[i] }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
