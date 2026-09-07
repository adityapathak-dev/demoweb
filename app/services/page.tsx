import SpecPageHero from "@/components/spec/PageHero";
import SpecServices from "@/components/spec/Services";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Eye Care" };

export default function ServicesPage() {
  return (
    <>
      <SpecPageHero
        kicker="Eye care · optometrist-led"
        title={<>A clinic&apos;s rigour. A studio&apos;s manners.</>}
        copy="Autorefractor, trial-lens refinement, tear-film check. Fixed prices on the wall, prescription SMS'd to you, valid anywhere — even if you buy nothing."
      />
      <SpecServices />
      <SpecBooking />
    </>
  );
}
