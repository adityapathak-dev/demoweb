import SpecPageHero from "@/components/spec/PageHero";
import TryOn from "@/components/spec/TryOn";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Virtual Try-On" };

export default function TryOnPage() {
  return (
    <>
      <SpecPageHero
        kicker="Try-on · On-device, private"
        title={<>See the scale before you decide.</>}
        copy="The camera preview fits frames to your face at true millimetre width. Nothing is recorded or uploaded — and the 48-hour home box makes the final call."
        cta={{ href: "/book", label: "Try 5 at home — free" }}
      />
      <TryOn />
      <section aria-label="Try-on tips" className="border-t border-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Get a fitting worth trusting</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Daylight", "Face a window. Overhead tube-lights flatten every frame."],
              ["Hair back", "Tuck hair behind ears so temple arms sit honestly."],
              ["Head straight", "Chin level, eyes in the guide oval — no angles."],
              ["Screenshot trio", "Save 3 favourites, compare side by side in your gallery."],
            ].map(([t, d]) => (
              <li key={t} className="card card-lift p-6">
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
