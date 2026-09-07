"use client";

import { useState } from "react";
import { STORE } from "@/lib/spec";

const SLOTS = ["11:00 AM", "12:30 PM", "2:00 PM", "4:00 PM", "5:30 PM", "7:00 PM"];
const DAYS = ["Today", "Tomorrow", "Day after"];

export default function SpecBooking({ compact = false }: { compact?: boolean }) {
  const [slot, setSlot] = useState("4:00 PM");
  const [day, setDay] = useState("Today");
  const [sent, setSent] = useState(false);

  return (
    <section aria-labelledby="book-h" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <p className="text-xs font-medium uppercase tracking-normal text-smoke">06 — Book in 30 seconds</p>
          <h2 id="book-h" className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-tight">
            Free eye test. No queue. No jargon.
          </h2>
          <ul className="mt-6 space-y-3 text-[15px] text-ink">
            {["Walk-ins welcome till 8 PM — booking skips the wait", "Prescription SMS'd + printed, valid anywhere", "No purchase pressure — 40% of tests end with 'no change'"].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-sand text-[11px] text-heading" aria-hidden>✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="card mt-6 p-6">
            <p className="text-xs font-medium uppercase tracking-normal text-smoke">Find us</p>
            <address className="mt-1 not-italic leading-relaxed">
              {STORE.addressLines[0]}<br />{STORE.addressLines[1]}
            </address>
            <p className="mt-2 text-sm">{STORE.hoursLines[0]} · {STORE.hoursLines[1]}</p>
            <a href={STORE.phoneHref} className="mt-4 inline-block rounded-lg bg-heading px-4 py-2 text-[13px] font-medium text-white hover:bg-ink transition-colors">
              Call {STORE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="card reveal p-6 sm:p-8" style={{ ["--reveal-delay" as string]: "120ms" }}>
          {sent ? (
            <div className="grid min-h-[360px] place-items-center text-center" role="status">
              <div>
                <p className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-sand text-xl text-heading" aria-hidden>✓</p>
                <h3 className="mt-4 text-2xl font-medium text-heading">{day}, {slot} — held!</h3>
                <p className="mt-2 text-sm text-smoke">We&apos;ve SMS&apos;d confirmation + a map pin. Come 5 min early — chai&apos;s on us.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-5 rounded-lg border border-border bg-transparent px-5 py-2 text-[13px] font-medium text-ink hover:bg-sand transition-colors">
                  Book another
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              aria-label="Book a free eye test"
              className="space-y-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="block text-sm font-medium text-heading">Name *</label>
                  <input id="bk-name" name="name" required autoComplete="name" placeholder="e.g. Adarsh Kumar" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-disabled" />
                </div>
                <div>
                  <label htmlFor="bk-phone" className="block text-sm font-medium text-heading">Phone *</label>
                  <input id="bk-phone" name="phone" required inputMode="tel" pattern="[0-9+ ]{10,15}" placeholder="+91 …" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-disabled" />
                </div>
              </div>
              <fieldset>
                <legend className="text-sm font-medium text-heading">Pick a day</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDay(d)}
                      aria-pressed={day === d}
                      className={`rounded-lg border py-2.5 text-[13px] font-medium transition-colors ${
                        day === d ? "border-heading bg-heading text-white" : "border-border bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-medium text-heading">Pick a slot — {day.toLowerCase()}</legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      aria-pressed={slot === s}
                      className={`rounded-lg border py-2.5 text-[13px] font-medium transition-colors ${
                        slot === s ? "border-heading bg-heading text-white" : "border-border bg-white text-ink hover:bg-sand"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="bk-need" className="block text-sm font-medium text-heading">What do you need?</label>
                <select id="bk-need" name="need" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm">
                  <option>First specs / new power check</option>
                  <option>Sunglasses (power / zero-power)</option>
                  <option>Contact-lens trial</option>
                  <option>Kids&apos; eye test (age 5+)</option>
                  <option>Repair / adjustment of old pair</option>
                </select>
              </div>
              {!compact && (
                <div>
                  <label htmlFor="bk-note" className="block text-sm font-medium text-heading">Anything we should know? <span className="font-normal text-smoke">(optional)</span></label>
                  <textarea id="bk-note" name="note" rows={2} placeholder="Headaches after screen time, night-driving glare…" className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm placeholder:text-disabled" />
                </div>
              )}
              <button type="submit" className="w-full rounded-lg bg-black py-3.5 text-sm font-medium text-white hover:bg-ink transition-colors">
                Hold my {day.toLowerCase()} {slot} slot — free
              </button>
              <p className="text-center text-xs text-smoke">No advance. SMS confirmation in ~60 seconds.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}