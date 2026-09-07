import { notFound } from "next/navigation";
import SpecPageHero from "@/components/spec/PageHero";
import SpecCollections from "@/components/spec/Collections";
import SpecBooking from "@/components/spec/Booking";

const LINES = {
  eyeglasses: {
    label: "Eyeglasses",
    kicker: "Shop · Eyeglasses",
    title: "Frames you'll forget you're wearing.",
    copy: "Acetate, metal and rimless — every pair cut for your power in-store the same day. Prices include single-vision lenses + fitting.",
  },
  sunglasses: {
    label: "Sunglasses",
    kicker: "Shop · Sunglasses",
    title: "Hyderabad sun, handled with elegance.",
    copy: "UV400 and polarized lenses in wayfarers, rounds, aviators and pantos. Power sun lenses made to order in 48 hours.",
  },
  screen: {
    label: "Blue-cut",
    kicker: "Shop · Screen & Blue-cut",
    title: "Eight-hour screen days, minus the burn.",
    copy: "Feather-light frames paired with blue-cut lenses that filter harsh high-energy light. Made for developers, designers and night owls.",
  },
  titanium: {
    label: "Titanium & Metal",
    kicker: "Shop · Titanium & Metal",
    title: "Twelve grams of nothing, engineered.",
    copy: "Rimless mounts, rose-gold rounds and metal aviators — the lightest frames we stock, adjusted to your face in minutes.",
  },
} as const;

type Line = keyof typeof LINES;

export function generateStaticParams() {
  return (Object.keys(LINES) as Line[]).map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  return params.then((p) => ({ title: LINES[p.category as Line]?.label ?? "Shop" }));
}

export default async function ShopCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const line = LINES[category as Line];
  if (!line) notFound();
  return (
    <>
      <SpecPageHero
        kicker={line.kicker}
        title={<>{line.title}</>}
        copy={line.copy}
        cta={{ href: "/book", label: "Try 5 at home — free" }}
      />
      <SpecCollections line={category as Line} />
      <SpecBooking compact />
    </>
  );
}
