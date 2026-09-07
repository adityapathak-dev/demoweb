import SpecHero from "@/components/spec/Hero";
import SpecTicker from "@/components/spec/Ticker";
import SpecCollections from "@/components/spec/Collections";
import ShopWall from "@/components/spec/ShopWall";
import FaceFinder from "@/components/spec/FaceFinder";
import TryOn from "@/components/spec/TryOn";
import SpecServices from "@/components/spec/Services";
import SpecBooking from "@/components/spec/Booking";
import Lookbook from "@/components/spec/Lookbook";
import Assurance from "@/components/spec/Assurance";
import SpecTestimonials from "@/components/spec/Testimonials";
import SpecFAQ from "@/components/spec/FAQ";

export default function Home() {
  return (
    <>
      <SpecHero />
      <SpecTicker />
      <ShopWall />
      <SpecCollections limit={6} />
      <FaceFinder />
      <TryOn />
      <SpecServices />
      <SpecBooking />
      <Lookbook />
      <SpecTestimonials />
      <Assurance />
      <SpecFAQ />
    </>
  );
}
