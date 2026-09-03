"use client";

import { useState } from "react";
import { CLASS_OPTIONS, SUBJECT_OPTIONS } from "@/lib/content";
import { CONTACT } from "@/lib/theme";
import { CheckIcon } from "./icons";

/** Full enquiry form — name, phone, class, subject, message. */
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const inputCls =
    "w-full rounded-xl border border-white/15 bg-abyss/60 px-4 py-3 text-sm text-white placeholder:text-faint outline-none transition-colors focus:border-pulse/70";

  if (sent) {
    return (
      <div className="rounded-3xl border border-signal/30 bg-signal/5 p-10 text-center">
        <p className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-signal text-xl text-abyss">
          <CheckIcon />
        </p>
        <h3 className="mt-5 font-display text-2xl font-bold text-white">Enquiry sent!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours. You
          can also reach us directly on WhatsApp for a faster response.
        </p>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-display text-sm font-bold text-abyss transition-transform hover:scale-[1.03]"
        >
          Chat on WhatsApp
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
      <h2 className="font-display text-xl font-bold text-white">Send an Enquiry</h2>
      <p className="mt-1 text-sm text-muted">
        Fill out the form and we&apos;ll get back to you within 24 hours.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Full name *
          </span>
          <input required type="text" placeholder="Your name" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Phone number *
          </span>
          <input required type="tel" placeholder="+91 …" className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Student&apos;s class *
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
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
            Subject interested in *
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
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-faint">
          Message (optional)
        </span>
        <textarea rows={4} placeholder="How can we help?" className={inputCls} />
      </label>
      <button
        type="submit"
        className="btn-sheen mt-6 w-full rounded-full bg-brand py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(47,107,255,0.9)] transition-colors hover:bg-[#4a82ff]"
      >
        Send Enquiry
      </button>
    </form>
  );
}
