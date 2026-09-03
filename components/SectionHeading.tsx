import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "brand" | "mind" | "signal" | "warm";
}

const EYEBROW_TONES: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  brand: "text-pulse",
  mind: "text-mind",
  signal: "text-signal",
  warm: "text-warm",
};

/** Editorial section header — eyebrow kick + oversized display title. */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "brand",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <p
        className={cn(
          "font-display text-xs font-bold uppercase tracking-[0.3em]",
          EYEBROW_TONES[tone]
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
