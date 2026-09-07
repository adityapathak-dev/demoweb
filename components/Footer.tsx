import Link from "next/link";
import { CONTACT } from "@/lib/theme";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Programs",
    links: [
      { href: "/programs", label: "Classes 8–10" },
      { href: "/programs", label: "Classes 11–12" },
      { href: "/programs", label: "JEE Foundation" },
      { href: "/programs", label: "NEET Preparation" },
    ],
  },
  {
    title: "Academy",
    links: [
      { href: "/approach", label: "Our Approach" },
      { href: "/results", label: "Results" },
      { href: "/schedule", label: "Schedule" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Students",
    links: [
      { href: "/login", label: "Student Login" },
      { href: "/schedule", label: "Class Schedule" },
      { href: "/login", label: "Teacher Login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-panel/70 p-8 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-pulse" />
              <p className="text-sm font-semibold text-pulse">Limited seats, max 15 per batch</p>
            </div>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to see
              <br />
              your child excel?
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-sheen rounded-full bg-brand px-8 py-4 font-display text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(47,107,255,0.9)] transition-colors hover:bg-[#2650DE]"
            >
              Book a Free Demo
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-8 py-4 font-display text-sm font-bold text-white transition-colors hover:border-pulse/60"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand via-brand-deep to-mind font-display text-sm font-bold text-white">
                EA
              </span>
              <span className="font-display text-lg font-bold">Excel Academy</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Personalised coaching for Classes 8–12. Building strong foundations, one
              student at a time.
            </p>
            <p className="mt-3 text-sm font-semibold text-faint">
              Est. 2012, New Delhi
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted">
              <a href={CONTACT.phoneHref} className="block transition-colors hover:text-pulse">
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block transition-colors hover:text-pulse"
              >
                {CONTACT.email}
              </a>
              <p>42 Knowledge Lane, New Delhi</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-sm font-semibold text-white">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>Mon – Sat</li>
                <li>8:00 AM – 8:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none mt-14 select-none overflow-hidden">
          <p className="text-outline whitespace-nowrap text-center font-display text-[13.5vw] font-bold leading-none tracking-tight opacity-60">
            EXCEL ACADEMY
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-faint sm:flex-row">
          <p>© 2024 Excel Academy. All rights reserved.</p>
          <p>Learn smarter, score higher</p>
        </div>
      </div>
    </footer>
  );
}
