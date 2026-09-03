"use client";

import { useState } from "react";
import { CLASS_OPTIONS, SUBJECT_OPTIONS } from "@/lib/content";
import { CONTACT } from "@/lib/theme";
import { CheckIcon } from "./icons";

const MODES = ["Offline", "Online", "Either"] as const;

/**
 * Free-demo request form (front-end only — confirms locally, exactly as
 * the reference does, and hands off to WhatsApp for a faster response).
 */
export default function DemoForm() {
  const [sent, setSent] = useState(false);
  const [mode, setMode] = useState<(typeof MODES)[number]>("Offline");

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-abyss/60 px-4 py-3 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-pulse/70";

  if (sent) {
    return (
      <div className="rounded-3xl border border-signal/30 bg-signal/5 p-10 text-center">
        <p className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal text-xl text-abyss">
          <CheckIcon />
        </p>
        <h3 className="mt-5 font-display text-2xl font-bold text-white">Demo requested!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ll reach out within 24 hours to schedule your free demo class.
        </p>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-display text-sm font-bold text-abyss transition-transform hover:scale-[1.03]"
        >
          WhatsApp for faster response
        </a>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-white/10 bg-panel/80 p-6 backdrop-blur sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="font-display text-xl font-bold text-white">Request a Free Demo</h3>
      <p className="mt-1 text-sm text-muted">
        Tell us about your child and we&apos;ll find the right class.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Student&apos;s class
          </span>
          <select required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select class
            </option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Subject
          </span>
          <select required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select subject
            </option>
            {SUBJECT_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
          Preferred mode
        </span>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={
                mode === m
                  ? "rounded-xl bg-brand px-3 py-2.5 text-sm font-bold text-white"
                  : "rounded-xl border border-white/15 bg-abyss/60 px-3 py-2.5 text-sm text-muted transition-colors hover:border-pulse/50 hover:text-white"
              }
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Phone / WhatsApp
          </span>
          <input required type="tel" placeholder="+91 …" className={inputCls} />
        </label>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Name (optional)
          </span>
          <input type="text" placeholder="Student's name" className={inputCls} />
        </label>
      </div>
      <button
        type="submit"
        className="btn-sheen mt-6 w-full rounded-full bg-brand py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(47,107,255,0.9)] transition-colors hover:bg-[#4a82ff]"
      >
        Request a Free Demo
      </button>
    </form>
  );
}
