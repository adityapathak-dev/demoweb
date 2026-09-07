const ITEMS = [
  "Flat 40% off frames",
  "Free eye test with any frame",
  "Same-day lenses in 45 min",
  "1-year frame warranty",
  "Home try-on: 5 frames, 48 hrs",
  "Students: extra 10% off",
];

export default function SpecTicker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-b border-border bg-white py-2.5" aria-label="Current offers">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-0">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
            {row.map((t, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-3 whitespace-nowrap px-5 text-xs font-medium text-smoke">
                {t} <span className="text-border">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
