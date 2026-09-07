import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";
import { STORE } from "@/lib/spec";

export const metadata = { title: "Visit" };

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Optician",
    name: STORE.name,
    telephone: STORE.phoneDisplay,
    email: STORE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE.addressLines[0],
      addressLocality: "Hyderabad",
      postalCode: "500081",
      addressCountry: "IN",
    },
    openingHours: ["Mo-Sa 10:30-21:30", "Su 11:00-20:00"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2314" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SpecPageHero
        kicker="Visit · ground floor, main atrium"
        title={<>Come squint at the chart. Leave seeing 6/6.</>}
        copy="Stroller + wheelchair accessible. Free parking validation for 2 hrs with any purchase. Repairs while you wait."
      />
      <section aria-label="Store details" className="bg-paper py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-3">
          {[
            ["Address", <span key="a">{STORE.addressLines[0]}<br />{STORE.addressLines[1]}</span>],
            ["Hours", <span key="h">{STORE.hoursLines.join(" · ")}</span>],
            ["Contact", <span key="c"><a className="underline" href={STORE.phoneHref}>{STORE.phoneDisplay}</a><br /><a className="underline" href={`mailto:${STORE.email}`}>{STORE.email}</a></span>],
          ].map(([t, d]) => (
            <div key={t as string} className="card p-6">
              <p className="text-[11px] font-medium uppercase tracking-normal text-heading">{t}</p>
              <p className="mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
