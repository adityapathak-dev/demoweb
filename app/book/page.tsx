import SpecPageHero from "@/components/spec/PageHero";
import SpecBooking from "@/components/spec/Booking";

export const metadata = { title: "Book Eye Test" };

export default function BookPage() {
  return (
    <>
      <SpecPageHero
        kicker="Book · 30 seconds"
        title={<>Hold your slot. Skip the queue.</>}
        copy="Free with any frame, ₹299 standalone (adjusted in your bill if you buy). SMS confirmation in ~60 seconds."
      />
      <SpecBooking />
    </>
  );
}
