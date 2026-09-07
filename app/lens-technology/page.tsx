import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Lens Technology" };

const LENSES = [
  ["Single-vision 1.56", "Included", "The everyday default. Clear distance or reading correction, anti-scratch coated."],
  ["Blue-cut 1.61", "+₹600", "Filters harsh high-energy light from screens. For 8-hour laptop days and late-night phones."],
  ["Photochromic", "+₹1,200", "Clear indoors, smoky outdoors in ~30 seconds. One pair for bike commutes and office alike."],
  ["1.67 high-index", "+₹1,800", "Up to 40% thinner for powers above ±4. No more thick-edge embarrassment."],
  ["Polarized sun", "+₹1,500", "Kills road and water glare. The Kondapur cab-driver favourite for night + day driving."],
];

const COATINGS = [
  ["Anti-scratch", "Hard coat baked on every lens. Peels within a year? Recoated free."],
  ["Anti-reflective", "Kills ghost images on night drives and video calls."],
  ["Hydrophobic", "Rain and sweat bead off; one wipe with the cloth and you're clear."],
  ["UV400", "100% UVA/UVB block on every sun lens, verified on the meter in-store."],
];

export default function LensTechnologyPage() {
  return (
    <>
      <SpecPageHero
        kicker="Lab · Lens technology"
        title={<>Lenses are the purchase. Frames are the packaging.</>}
        copy="Every lens below sits on the tray where you can touch it. Prices locked before cutting — the edging lab is behind glass, watch it happen."
      />
      <section aria-label="Lens options" className="bg-paper py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Pick your lens</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LENSES.map(([t, p, d], i) => (
              <li key={t} className={`card card-lift p-6 ${i === 0 ? "lg:col-span-1" : ""}`}>
                <p className="font-semibold text-heading">{t} <span className="ml-1 rounded-lg bg-sand px-2 py-0.5 text-xs font-medium text-golddeep">{p}</span></p>
                <p className="mt-1.5 text-sm leading-relaxed text-smoke">{d}</p>
              </li>
            ))}
            <li className="card flex flex-col justify-between bg-heading p-6 shadow-none!">
              <p className="font-medium text-paper">Not sure which index your power needs?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/70">Bring any chit — the optometrist prescribes the thinnest lens you actually need, never the priciest.</p>
              <a href="/book" className="mt-4 inline-block rounded-lg bg-gold px-4 py-2.5 text-center text-sm font-semibold text-heading transition-colors hover:bg-golddeep hover:text-white">
                Ask at a free test →
              </a>
            </li>
          </ul>
          <h2 className="mt-12 text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Coatings on everything</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COATINGS.map(([t, d]) => (
              <li key={t} className="rounded-xl border border-border bg-white p-5">
                <p className="font-semibold text-heading">{t}</p>
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
