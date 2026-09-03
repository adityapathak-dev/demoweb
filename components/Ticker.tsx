/**
 * Ticker — an award-style marquee ribbon of what the academy stands on.
 * Pure CSS motion, duplicated list for a seamless loop, hidden from
 * assistive tech (all items are decorative repetitions of real content).
 */
const ITEMS = [
  "Small batches · Max 15",
  "Boards · JEE · NEET",
  "Conceptual clarity",
  "Weekly tests",
  "Personalised attention",
  "95% board pass rate",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy/70 py-5">
      <div
        aria-hidden
        className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap"
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
                  : "text-outline font-display text-xl font-bold tracking-tight sm:text-2xl"
              }
            >
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-pulse" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-abyss to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-abyss to-transparent" />
    </div>
  );
}
