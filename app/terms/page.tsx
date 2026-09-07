import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Terms of Service" };

const SECTIONS: [string, string][] = [
  ["Prices", "The tag is the till: listed prices include single-vision lenses, fitting and GST. Lens add-ons are quoted before cutting and printed on your bill."],
  ["Eye tests", "₹299 standalone, free with any frame — adjusted in your bill if you buy within 30 days. Prescriptions are valid anywhere, including competitors."],
  ["Exchanges", "14-day frame exchange, no questions. Lenses cut to your power can't be resold, so lens charges stay — frames swap free."],
  ["Warranty", "12 months on frames and coatings per the warranty page. Accidental damage is repaired at cost with a quote before we touch anything."],
  ["Home trials", "Five frames, 48 hours, free pickup. Lost or badly damaged trial frames are billed at the tag price minus 20% — the rest is on us."],
  ["Demo honesty", "This site is a client-review demo: copy, prices and reviews illustrate the experience. The store honours whatever is printed on your physical bill."],
];

export default function TermsPage() {
  return (
    <>
      <SpecPageHero
        kicker="Legal · Plain words"
        title={<>Fair terms, readable by humans.</>}
        copy="Last reviewed September 2026. Six clauses, zero latin."
      />
      <section aria-label="Terms of service" className="bg-paper py-14">
        <div className="mx-auto max-w-3xl space-y-4 px-5 sm:px-8">
          {SECTIONS.map(([h, p]) => (
            <article key={h} className="card p-6">
              <h2 className="text-lg font-medium text-heading">{h}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-smoke">{p}</p>
            </article>
          ))}
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
