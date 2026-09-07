import Link from "next/link";
import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Prescription Guide" };

const ROWS = [
  ["SPH (sphere)", "Your main power. Minus (–) = short-sight, plus (+) = long-sight.", "–2.50"],
  ["CYL (cylinder)", "Astigmatism correction. Blank or 0.00 means none.", "–0.75"],
  ["AXIS", "The angle for your CYL, 1–180. Ignored if CYL is zero.", "180"],
  ["ADD", "Extra close-up power for progressives and bifocals.", "+1.50"],
  ["PD", "Pupil distance in mm — where your lenses centre. We measure free.", "63"],
  ["DV / NV", "Distance vision vs near vision — which pair this chit is for.", "DV"],
];

export default function PrescriptionGuidePage() {
  return (
    <>
      <SpecPageHero
        kicker="Guide · Read your chit"
        title={<>Your prescription, decoded in 60 seconds.</>}
        copy="Any valid chit works here — ours, an eye hospital's, even a two-year-old one we'll re-verify free before cutting lenses."
      />
      <section aria-label="Prescription terms" className="bg-paper py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-sand/60 text-xs uppercase text-smoke">
                  <th scope="col" className="px-5 py-3 font-medium">Term</th>
                  <th scope="col" className="px-5 py-3 font-medium">What it means</th>
                  <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Looks like</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([t, d, e]) => (
                  <tr key={t} className="border-b border-border last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-semibold text-heading">{t}</th>
                    <td className="px-5 py-3.5 text-ink">{d}</td>
                    <td className="hidden px-5 py-3.5 font-mono text-smoke sm:table-cell">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card mt-5 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink">
              <strong className="font-semibold text-heading">Lost your chit?</strong> WhatsApp us a photo —
              our optometrist reads it free and tells you if it&apos;s still valid.
            </p>
            <Link href="/book" className="shrink-0 rounded-lg bg-heading px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-ink">
              Verify my power — free
            </Link>
          </div>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
