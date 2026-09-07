function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
      <path d="m9.5 11.5 2 2 3.5-4" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9a8 8 0 0 1 14-3l2 2" />
      <path d="M20 4v4h-4" />
      <path d="M20 15a8 8 0 0 1-14 3l-2-2" />
      <path d="M4 20v-4h4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LensIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}

const ITEMS = [
  { icon: ShieldIcon, title: "1-year warranty", note: "Frames + coatings, in writing" },
  { icon: ReturnIcon, title: "14-day exchange", note: "No questions, no frowns" },
  { icon: EyeIcon, title: "Free eye test", note: "With any frame, every time" },
  { icon: LensIcon, title: "Lab-grade lenses", note: "Quoted before cutting" },
];

/**
 * Quiet confidence strip — icon + two lines, no cards, no decoration.
 * Sits between social proof and FAQ as a calm pre-close signal.
 */
export default function Assurance() {
  return (
    <section aria-label="Store assurances" className="border-y border-border bg-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-8 sm:px-8 lg:grid-cols-4">
        {ITEMS.map((b) => (
          <li key={b.title} className="reveal flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center text-heading" aria-hidden>
              <b.icon />
            </span>
            <span>
              <span className="block text-sm font-semibold text-heading">{b.title}</span>
              <span className="block text-xs text-smoke">{b.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
