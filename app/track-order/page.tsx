"use client";

import { useState } from "react";
import SpecPageHero from "@/components/spec/PageHero";
import { STORE } from "@/lib/spec";

const STEPS = [
  ["Order received", "Frame reserved on the wall, prescription confirmed by SMS."],
  ["Lenses edged", "Cut in-store on the edging line — about 45 minutes at the bench."],
  ["Fitted & QC", "Nose-pad alignment, temple balance, coating check under the lamp."],
  ["Ready / shipped", "Collect in-store or get it couriered with a hard case + cloth."],
];

/** Demo tracker — any 6+ character code returns a plausible timeline. */
export default function TrackOrderPage() {
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<number | null>(null);

  function track(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim();
    if (c.length < 4) return;
    let h = 0;
    for (let i = 0; i < c.length; i++) h = (h * 31 + c.charCodeAt(i)) % 4;
    setStage(h);
  }

  return (
    <>
      <SpecPageHero
        kicker="Support · Track order"
        title={<>Where are my glasses?</>}
        copy="Enter the order code from your SMS receipt (e.g. SPEC-2481). Demo: any code of 4+ characters returns a sample timeline."
      />
      <section aria-label="Order tracker" className="bg-paper py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <form onSubmit={track} className="card flex flex-col gap-2 p-4 sm:flex-row">
            <label htmlFor="track-code" className="sr-only">Order code</label>
            <input
              id="track-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SPEC-2481"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-border bg-white px-4 py-3 text-sm tracking-widest placeholder:text-disabled"
            />
            <button type="submit" className="rounded-lg bg-heading px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
              Track
            </button>
          </form>

          {stage !== null && (
            <ol className="mt-8" aria-live="polite">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="relative grid grid-cols-[48px_1fr] gap-4 pb-7 last:pb-0">
                  {i < STEPS.length - 1 && <span className="absolute left-[23px] top-12 h-full w-px bg-border" aria-hidden />}
                  <span
                    aria-hidden
                    className={`grid h-12 place-items-center rounded-lg text-sm font-semibold ${
                      i <= stage ? "bg-heading text-white" : "bg-sand text-smoke"
                    }`}
                  >
                    {i <= stage ? "✓" : i + 1}
                  </span>
                  <div className={`card p-5 ${i === stage ? "border-l-4 border-l-gold!" : ""}`}>
                    <p className="font-medium text-heading">{t}{i === stage && <span className="ml-2 text-xs font-medium text-golddeep">· current</span>}</p>
                    <p className="mt-1 text-sm text-smoke">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-6 text-center text-sm text-smoke">
            Stuck? <a className="font-medium text-heading underline underline-offset-2" href={STORE.phoneHref}>{STORE.phoneDisplay}</a> — a human answers in store hours.
          </p>
        </div>
      </section>
    </>
  );
}
