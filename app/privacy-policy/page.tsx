import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Privacy Policy" };

const SECTIONS: [string, string][] = [
  ["What we collect", "Your name, phone number, prescription and order history — only what the counter needs to serve you. The camera try-on runs on your device; no video is recorded or uploaded, ever."],
  ["What we never do", "No selling data, no broker lists, no ad-network pixels profiling your eyesight. Demo analytics, if enabled, are aggregate and anonymous."],
  ["Prescriptions", "Your power readings stay on your bill and our lab register for warranty service. Ask anytime and we delete the lab copy — the printed chit is yours to keep."],
  ["Messages", "SMS and WhatsApp confirmations carry your slot and order status. Reply STOP once and marketing nudges end; transactional receipts continue."],
  ["Your rights", "See, correct or delete your record at the store with your phone number — done in minutes, no forms in triplicate."],
];

export default function PrivacyPage() {
  return (
    <>
      <SpecPageHero
        kicker="Legal · Plain words"
        title={<>Your eyes. Your data. Our silence.</>}
        copy="Last reviewed September 2026. Short version: we keep what the lab needs and nothing it doesn't."
      />
      <section aria-label="Privacy policy" className="bg-paper py-14">
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
