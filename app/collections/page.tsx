import SpecPageHero from "@/components/spec/PageHero";
import SpecCollections from "@/components/spec/Collections";
import ShopWall from "@/components/spec/ShopWall";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Frames" };

export default function CollectionsPage() {
  return (
    <>
      <SpecPageHero
        kicker="Frames · 120+ in store"
        title={<>Picked for Hyderabad light. Priced for real life.</>}
        copy="Every frame below is stocked in-store in 3 colours with lenses cut the same day. Prices include single-vision lenses + fitting — the number on the tag is the number at the till."
        cta={{ href: "/book", label: "Try 5 at home — free" }}
      />
      <SpecCollections />
      <ShopWall />
      <section aria-label="Lens add-ons" className="border-t border-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold text-heading">Lens add-ons, on the tray — no surprise upsells</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Blue-cut", "+₹600", "8-hr screen days"],
              ["Photochromic", "+₹1,200", "Bike + outdoor"],
              ["1.67 high-index", "+₹1,800", "Power above ±4"],
              ["Polarized sun", "+₹1,500", "Driving glare"],
            ].map(([t, p, d]) => (
              <li key={t} className="card card-lift p-6">
                <p className="font-semibold text-heading">{t} <span className="ml-1 text-sm font-medium text-smoke">{p}</span></p>
                <p className="mt-1 text-sm text-smoke">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
