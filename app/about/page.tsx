import Image from "next/image";
import SpecPageHero from "@/components/spec/PageHero";
import SpecTrust from "@/components/spec/Trust";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Studio" };

export default function AboutPage() {
  return (
    <>
      <SpecPageHero
        kicker="Studio · since 2016"
        title={<>From a 200 sq-ft kiosk to the mall&apos;s top-rated optician.</>}
        copy="Founded by optometrist Dr. Priya Nair and frame-buyer Arjun Mehta. Nine years, 18,000+ exams, one rule: never sell a frame before the refraction is right."
        cta={{ href: "/book", label: "Meet us — book a free test" }}
      />
      <SpecTrust />
      <section aria-label="Milestones" className="border-t border-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold text-heading">Milestones we actually hit</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2016", "Kiosk opens", "2 staff, 40 frames, one borrowed autorefractor."],
              ["2019", "In-store lab", "Same-day edging — wait time drops from 7 days to 45 min."],
              ["2022", "Home try-on", "5-frame boxes across HITEC City; 3,000+ trials delivered."],
              ["2025", "Top-rated", "4.9★ across 2,300+ reviews. Zero paid reviews — check the blunt ones."],
            ].map(([y, t, d]) => (
              <li key={y} className="card card-lift p-6">
                <p className="text-xs font-medium text-smoke">{y}</p>
                <p className="mt-1 text-lg font-semibold text-heading">{t}</p>
                <p className="mt-1 text-sm text-smoke">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-label="Inside the studio" className="bg-sand py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/frames/hero.jpg"
              alt="A customer browsing the frame wall inside the SPEC store"
              width={1200}
              height={600}
              className="h-[280px] w-full object-cover sm:h-[360px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
            <p className="absolute bottom-4 left-4 text-sm font-medium text-white">Inside SPEC, Inorbit Mall · 120+ frames on the wall</p>
          </div>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
