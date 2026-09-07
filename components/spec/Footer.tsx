import Link from "next/link";
import { NAV_LINKS, STORE } from "@/lib/spec";

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

/**
 * Footer — structure kept, hierarchy tightened: small uppercase headers,
 * lighter links, outline social icons.
 */
export default function SpecFooter() {
  return (
    <footer className="border-t border-border bg-white" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-sm font-semibold text-white">SP</span>
              <span className="leading-none">
                <span className="block text-base font-semibold tracking-tight text-heading">SPEC</span>
                <span className="block text-[10px] uppercase text-smoke">Optical Studio</span>
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-smoke">
              {STORE.tagline} Mall-studio optician — exams, same-day lenses, honest prices.
            </p>
            <p className="mt-3 text-[13px] font-light text-smoke">
              {STORE.rating}★ · {STORE.reviews} reviews · {STORE.examsDone} exams
            </p>
            {/* Socials — outline icons. Handles are placeholders until real ones land. */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://www.instagram.com/specstudio.hyd"
                target="_blank"
                rel="noreferrer"
                aria-label="SPEC on Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink transition-colors hover:bg-sand"
              >
                <IgIcon />
              </a>
              <a
                href="https://www.facebook.com/specstudiohyd"
                target="_blank"
                rel="noreferrer"
                aria-label="SPEC on Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink transition-colors hover:bg-sand"
              >
                <FbIcon />
              </a>
              <a
                href={STORE.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="SPEC on WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink transition-colors hover:bg-sand"
              >
                <WaIcon />
              </a>
              <a
                href="https://maps.google.com/?q=Inorbit+Mall+HITEC+City+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="ml-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-sand"
              >
                Maps
              </a>
              <a href={STORE.phoneHref} className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-sand">
                Call
              </a>
            </div>
          </div>
          <nav aria-label="Shop">
            <p className="text-[11px] font-medium uppercase tracking-wider text-smoke">Shop</p>
            <ul className="mt-3 space-y-2 text-sm font-light">
              {["Eyeglasses from ₹1,499", "Sunglasses + polarized", "Blue-cut & photochromic", "Contact lenses", "Kids' flex frames", "Repairs & spares"].map((t) => (
                <li key={t}>
                  <Link href="/collections" className="text-ink/90 transition-colors hover:text-heading">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Studio">
            <p className="text-[11px] font-medium uppercase tracking-wider text-smoke">Studio</p>
            <ul className="mt-3 space-y-2 text-sm font-light">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink/90 transition-colors hover:text-heading">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-smoke">Visit</p>
            <address className="mt-3 text-sm font-light not-italic leading-relaxed text-ink">
              {STORE.addressLines[0]}
              <br />
              {STORE.addressLines[1]}
            </address>
            <ul className="mt-3 space-y-1 text-[13px] font-light text-smoke">
              {STORE.hoursLines.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <a href={STORE.phoneHref} className="mt-3 inline-block text-sm font-medium text-heading underline underline-offset-2">
              {STORE.phoneDisplay}
            </a>
          </div>
        </div>
        <p className="mt-12 select-none overflow-hidden whitespace-nowrap text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none text-border" aria-hidden>
          SPEC · SEE CLEARLY ·
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs font-light text-smoke">
          <p>© 2026 SPEC Optical Studio · Demo site for client review (via Adarsh)</p>
          <p>Prescriptions honoured anywhere · Prices incl. GST</p>
        </div>
      </div>
    </footer>
  );
}
