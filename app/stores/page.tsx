import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";
import { STORE } from "@/lib/spec";

export const metadata = { title: "Stores" };

const ZONES = ["Madhapur", "Gachibowli", "Jubilee Hills", "Kondapur", "HITEC City", "Banjara Hills"];

export default function StoresPage() {
  return (
    <>
      <SpecPageHero
        kicker="Stores · Hyderabad"
        title={<>One flagship. Six neighbourhoods served at home.</>}
        copy="Our Inorbit Mall studio holds 120+ frames and the edging lab. Everywhere else in HITEC City's orbit, the try-on box comes to you."
      />
      <section aria-label="Flagship store" className="bg-paper py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card overflow-hidden">
            <div className="p-7">
              <p className="inline-block rounded-lg bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase text-heading">Flagship</p>
              <h2 className="mt-3 text-2xl font-medium text-heading">SPEC Optical Studio, Inorbit Mall</h2>
              <address className="mt-2 not-italic leading-relaxed text-ink">
                {STORE.addressLines[0]}<br />{STORE.addressLines[1]}
              </address>
              <ul className="mt-3 space-y-1 text-sm text-smoke">
                {STORE.hoursLines.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="https://maps.google.com/?q=Inorbit+Mall+HITEC+City+Hyderabad" target="_blank" rel="noreferrer" className="rounded-lg bg-heading px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink">
                  Open in Maps →
                </a>
                <a href={STORE.phoneHref} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand">
                  Call {STORE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <div className="card p-7">
            <h2 className="text-xl font-medium text-heading">Home try-on zones</h2>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              No store near you? Five frames ride to your door for 48 hours — free delivery and pickup.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ZONES.map((z) => (
                <li key={z} className="rounded-lg bg-sand px-3.5 py-1.5 text-sm font-medium text-ink">{z}</li>
              ))}
            </ul>
            <a href="/book" className="mt-5 inline-block rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-golddeep hover:text-white">
              Book a home trial →
            </a>
          </div>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
