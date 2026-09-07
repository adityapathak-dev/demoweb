import { STORE } from "@/lib/spec";

const BADGES = ["Zeiss lab partner", "Bausch & Lomb fitting", "1-yr frame warranty", "No-questions 14-day exchange"];

export default function SpecTrust() {
  return (
    <section aria-labelledby="trust-h" className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal">
          <p className="text-xs font-medium uppercase tracking-normal text-smoke">03 — Why mall crowds trust us</p>
          <h2 id="trust-h" className="mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
            Nine years. One mall corner. Zero power-guessing.
          </h2>
          <figure className="card-lift card mt-8 p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-border bg-sand font-medium text-smoke" aria-hidden>
                DP
              </span>
              <figcaption>
                <p className="text-base font-medium text-heading">Dr. Priya Nair, M.Optom</p>
                <p className="text-xs text-smoke">In-house optometrist · 12 yrs · Osmania + LVPEI trained</p>
              </figcaption>
            </div>
            <blockquote className="mt-4 text-[15px] text-ink">
              &ldquo;I refuse to sell a frame before the refraction is right. If your power hasn&apos;t changed, I&apos;ll tell you
              to keep your old pair and just replace the nose pads — free.&rdquo;
            </blockquote>
          </figure>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Certifications">
            {BADGES.map((b) => (
              <li key={b} className="rounded-lg bg-sand px-3 py-1.5 text-xs font-medium text-ink">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="reveal text-base font-medium text-heading">Your lenses, cut while you shop — 45 minutes</h3>
          <ol className="mt-5 space-y-0">
            {[
              ["0:00", "Refraction + frame pick", "Digital autorefractor, trial lenses, face-shape consult. Prescription printed + SMS'd."],
              ["0:10", "Lens selection on the tray", "See and touch blue-cut, photochromic, 1.67 samples. Price locked before cutting."],
              ["0:15", "In-store edging lab", "Glass door — watch your lenses being cut. Free chai while you wait."],
              ["0:45", "Fit, align + warranty seal", "Nose-pad + temple alignment, warranty card stamped, 14-day exchange explained."],
            ].map(([t, title, copy], i) => (
              <li key={t} className="reveal relative grid grid-cols-[56px_1fr] gap-4 pb-7 last:pb-0" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                {i < 3 && <span className="absolute left-[27px] top-11 h-full w-px bg-border" aria-hidden />}
                <span className="grid h-14 place-items-center rounded-lg bg-sand text-xs font-medium text-ink">{t}</span>
                <div className="card p-5">
                  <p className="font-medium text-heading">{title}</p>
                  <p className="mt-1 text-sm text-smoke">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="reveal card mt-6 p-5 text-xs text-smoke">
            Store history: opened 2016 as a 200 sq-ft kiosk, now the mall&apos;s top-rated optician
            ({STORE.rating}★, {STORE.reviews} reviews, {STORE.examsDone} exams done).
          </p>
        </div>
      </div>
    </section>
  );
}