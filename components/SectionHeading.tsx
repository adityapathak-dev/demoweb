import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "brand" | "mind" | "signal" | "warm";
}

const KICKER_TONES: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  brand: "text-pulse",
  mind: "text-mind",
  signal: "text-signal",
  warm: "text-warm",
};

const RULE_TONES: Record<NonNullable<SectionHeadingProps["tone"]>, string> = {
  brand: "bg-pulse",
  mind: "bg-mind",
  signal: "bg-signal",
  warm: "bg-warm",
};

/**
 * Section header — a plain-spoken kicker (hairline rule + sentence case,
 * never tracked-out caps) over an oversized display title.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "brand",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span aria-hidden className={cn("h-px w-9", RULE_TONES[tone])} />
        <p className={cn("text-sm font-semibold", KICKER_TONES[tone])}>{eyebrow}</p>
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}
