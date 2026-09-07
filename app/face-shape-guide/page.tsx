import SpecPageHero from "@/components/spec/PageHero";
import FaceFinder from "@/components/spec/FaceFinder";
import SpecBooking from "@/components/spec/Booking";
import { FACE_SHAPES } from "@/lib/spec";

export const metadata = { title: "Face Shape Guide" };

export default function FaceShapeGuidePage() {
  return (
    <>
      <SpecPageHero
        kicker="Guide · Find your fit"
        title={<>Contrast flatters. Echoes don&rsquo;t.</>}
        copy="The one rule our stylists use: pick frames that contrast your face shape instead of repeating it. Try the finder, then shop the shapes."
      />
      <FaceFinder />
      <section aria-label="Shape cheat-sheet" className="border-t border-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">The cheat-sheet, on one screen</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FACE_SHAPES.map((s) => (
              <li key={s.id} className="card card-lift p-5">
                <p className="text-xs font-medium uppercase text-golddeep">{s.label}</p>
                <p className="mt-2 text-sm font-medium text-heading">{s.frames.join(" · ")}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-smoke">{s.tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SpecBooking compact />
    </>
  );
}
