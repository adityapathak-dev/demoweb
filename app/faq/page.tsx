import SpecPageHero from "@/components/spec/PageHero";
import SpecFAQ from "@/components/spec/FAQ";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "FAQ" };

const SHIPPING = [
  ["Dispatch", "Same-day for orders before 4 PM from the Inorbit lab. Home-trial boxes ship next morning."],
  ["Delivery areas", "Madhapur, Gachibowli, Jubilee Hills, Kondapur, HITEC City, Banjara Hills — free both ways."],
  ["Packaging", "Hard case, microfibre cloth, prescription card and GST bill in every box."],
  ["Exchanges", "14 days, no questions. Wear them for two weeks — if they aren't you, swap the frame."],
];

export default function FaqPage() {
  return (
    <>
      <SpecPageHero
        kicker="Support · FAQ"
        title={<>Asked at the counter, answered here.</>}
        copy="Prices, timelines, insurance, kids, trials, warranty — the six questions first, shipping details below."
      />
      <SpecFAQ />
      <section aria-label="Shipping and returns" className="border-t border-border bg-sand py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Shipping & returns, in plain words</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHIPPING.map(([t, d]) => (
              <li key={t} className="card p-6">
                <p className="font-semibold text-heading">{t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-smoke">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
