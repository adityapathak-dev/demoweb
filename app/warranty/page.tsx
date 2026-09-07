"use client";

import { useState } from "react";
import SpecPageHero from "@/components/spec/PageHero";

const COVERED = [
  ["Frame defects", "Snapped hinge, peeling finish, loose weld — repaired or replaced free for 12 months."],
  ["Lens coatings", "Anti-scratch or AR layer peels? Recoated free within the year, no interrogation."],
  ["Fit drift", "Slipping nose pads, crooked temples — realigned free, any number of visits."],
];

const NOT_COVERED = ["Stepped on, sat on, or run over — we repair at cost, honestly quoted.", "Lost screws after month 3? Replaced free anyway. We're not monsters."];

/** Demo warranty registration — validates locally, confirms instantly. */
export default function WarrantyPage() {
  const [done, setDone] = useState(false);
  return (
    <>
      <SpecPageHero
        kicker="Support · Warranty"
        title={<>One year, in writing, on every pair.</>}
        copy="Register below and the warranty card lives on your phone number — nothing to keep, nothing to lose."
      />
      <section aria-label="Warranty registration" className="bg-paper py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            {done ? (
              <div className="grid min-h-[280px] place-items-center text-center" role="status">
                <div>
                  <p className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-sand text-xl text-golddeep" aria-hidden>✓</p>
                  <h2 className="mt-4 text-2xl font-medium text-heading">Warranty stamped.</h2>
                  <p className="mt-2 text-sm text-smoke">Valid for 12 months from today. Show your phone number at the counter — that&apos;s the whole process.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                aria-label="Register warranty"
                className="space-y-4"
              >
                <h2 className="text-xl font-medium text-heading">Register in 20 seconds</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="wr-name" className="block text-sm font-medium text-heading">Name *</label>
                    <input id="wr-name" required autoComplete="name" placeholder="Full name" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-disabled" />
                  </div>
                  <div>
                    <label htmlFor="wr-phone" className="block text-sm font-medium text-heading">Phone *</label>
                    <input id="wr-phone" required inputMode="tel" pattern="[0-9+ ]{10,15}" placeholder="+91 …" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-disabled" />
                  </div>
                </div>
                <div>
                  <label htmlFor="wr-sku" className="block text-sm font-medium text-heading">Frame code * <span className="font-normal text-smoke">(on your bill — e.g. SP-CL01)</span></label>
                  <input id="wr-sku" required placeholder="SP-…" autoComplete="off" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm uppercase placeholder:text-disabled" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-heading py-3 text-sm font-medium text-white transition-colors hover:bg-ink">
                  Stamp my warranty
                </button>
              </form>
            )}
          </div>
          <div className="space-y-5">
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-medium text-heading">What&apos;s covered</h2>
              <ul className="mt-4 space-y-3">
                {COVERED.map(([t, d]) => (
                  <li key={t} className="flex gap-3 text-sm">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gold text-[11px] font-semibold text-heading" aria-hidden>✓</span>
                    <span><strong className="font-semibold text-heading">{t}.</strong> <span className="text-smoke">{d}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="text-base font-medium text-heading">The honest exclusions</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-smoke">
                {NOT_COVERED.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
