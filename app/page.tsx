import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Tracks from "@/components/Tracks";
import WhyExcel from "@/components/WhyExcel";
import ResultsPreview from "@/components/ResultsPreview";
import MethodSection from "@/components/MethodSection";
import Testimonial from "@/components/Testimonial";
import DemoCTA from "@/components/DemoCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Tracks />
      <WhyExcel />
      <ResultsPreview />
      <MethodSection />
      <Testimonial />
      <DemoCTA />
    </>
  );
}
