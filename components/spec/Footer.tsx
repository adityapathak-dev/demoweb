"use client";

import Link from "next/link";
import { useState } from "react";
import { STORE } from "@/lib/spec";

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 8h2.5V4.5H14A4.5 4.5 0 0 0 9.5 9v2.5H7V15h2.5v5H13v-5h2.5l.5-3.5h-3V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4a8 8 0 0 0-6.9 12L4 20l4.2-1.1A8 8 0 1 0 12 4Z" />
      <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5 2 1c-.5 1.5-1.5 2-3 1.5-3-1-6.5-4.5-7.5-7.5-.5-1.5 0-2.5 1.5-3l1 2L9 9.5Z" />
    </svg>
  );
}

const COLS: { h: string; links: { href: string; label: string }[] }[] = [
  {
    h: "Shop",
    links: [
      { href: "/shop/eyeglasses", label: "Eyeglasses" },
      { href: "/shop/sunglasses", label: "Sunglasses" },
      { href: "/shop/screen", label: "Blue-cut screen" },
      { href: "/shop/titanium", label: "Titanium & metal" },
      { href: "/collections", label: "All frames" },
    ],
  },
  {
    h: "Eye care",
    links: [
      { href: "/book", label: "Book free eye test" },
      { href: "/services", label: "Services & lab" },
      { href: "/try-on", label: "Virtual try-on" },
      { href: "/face-shape-guide", label: "Face shape guide" },
      { href: "/prescription-guide", label: "Prescription guide" },
      { href: "/lens-technology", label: "Lens technology" },
    ],
  },
  {
    h: "Support",
    links: [
      { href: "/track-order", label: "Track order" },
      { href: "/stores", label: "Stores" },
      { href: "/faq", label: "FAQ & shipping" },
      { href: "/warranty", label: "Warranty" },
      { href: "/contact", label: "Contact" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

/**
 * Flagship footer — deep ink with layered gold ambience, newsletter salon,
 * complete link columns, working socials. No dead ends: every link resolves.
 */
export default function SpecFooter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-heading text-paper" aria-label="Footer">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_12%_0%,rgba(176,141,87,0.14),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-gold">The Private Salon</p>
            <h2 className="mt-2 max-w-md text-2xl font-medium leading-snug text-paper">
              First look at limited drops, plus 15% off your first frame.
            </h2>
          </div>
          <div className="flex items-end">
            {joined ? (
              <p className="rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-paper" role="status">
                ✓ You&apos;re on the list — the welcome code is on its way to <strong>{email}</strong>.
              </p>
            ) : (
              <form
                className="flex w-full flex-col gap-2 sm:flex-row"
                onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setJoined(true); }}
              >
                <label htmlFor="nl-email" className="sr-only">Email for the Private Salon</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/40"
                />
                <button type="submit" className="shrink-0 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-golddeep hover:text-white">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[1.2fr_0.7fr_0.8fr_0.7fr_1fr]">
          <div>
            <p className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-sm font-semibold text-heading">SP</span>
              <span className="leading-none">
                <span className="block text-base font-semibold tracking-tight text-paper">SPEC</span>
                <span className="block text-[10px] uppercase text-paper/50">Optical Studio</span>
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-paper/60">
              {STORE.tagline} Mall-studio optician — exams, same-day lenses, honest prices.
            </p>
            <p className="mt-3 text-[13px] font-light text-paper/60">
              <span className="text-gold">★</span> {STORE.rating} · {STORE.reviews} reviews · {STORE.examsDone} exams
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a href="https://www.instagram.com/specstudio.hyd" target="_blank" rel="noreferrer" aria-label="SPEC on Instagram" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-paper/80 transition-colors hover:bg-white/10 hover:text-paper">
                <IgIcon />
              </a>
              <a href="https://www.facebook.com/specstudiohyd" target="_blank" rel="noreferrer" aria-label="SPEC on Facebook" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-paper/80 transition-colors hover:bg-white/10 hover:text-paper">
                <FbIcon />
              </a>
              <a href={STORE.whatsapp} target="_blank" rel="noreferrer" aria-label="SPEC on WhatsApp" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-paper/80 transition-colors hover:bg-white/10 hover:text-paper">
                <WaIcon />
              </a>
              <a href="https://maps.google.com/?q=Inorbit+Mall+HITEC+City+Hyderabad" target="_blank" rel="noreferrer" className="ml-1 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-paper/80 transition-colors hover:bg-white/10 hover:text-paper">
                Maps
              </a>
              <a href={STORE.phoneHref} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-paper/80 transition-colors hover:bg-white/10 hover:text-paper">
                Call
              </a>
            </div>
          </div>
          {COLS.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gold">{c.h}</p>
              <ul className="mt-3 space-y-2 text-sm font-light">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-paper/70 transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-gold">Visit</p>
            <address className="mt-3 text-sm font-light not-italic leading-relaxed text-paper/70">
              {STORE.addressLines[0]}
              <br />
              {STORE.addressLines[1]}
            </address>
            <ul className="mt-3 space-y-1 text-[13px] font-light text-paper/50">
              {STORE.hoursLines.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <a href={STORE.phoneHref} className="mt-3 inline-block text-sm font-medium text-paper underline decoration-gold underline-offset-4">
              {STORE.phoneDisplay}
            </a>
          </div>
        </div>
        <p className="select-none overflow-hidden whitespace-nowrap text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none text-white/10" aria-hidden>
          SPEC · SEE CLEARLY ·
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs font-light text-paper/50">
          <p>© 2026 SPEC Optical Studio · Demo site for client review (via Adarsh)</p>
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-paper">Privacy</Link>
            <Link href="/terms" className="hover:text-paper">Terms</Link>
            <Link href="/sitemap" className="hover:text-paper">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
