import type { Topper } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Topper slip — set like a marksheet excerpt, not a SaaS card.
 * Ruled baseline, oversized tabular score, and the honour as a
 * rubber-stamp struck at a slight angle. (Signal lime stays reserved
 * for outcomes.)
 */
export default function TopperCard({ topper, index = 0 }: { topper: Topper; index?: number }) {
  // each slip is pinned very slightly off-level, like results on a noticeboard
  const tilt = index % 2 === 0 ? "sm:rotate-[0.5deg]" : "sm:-rotate-[0.5deg]";
  return (
    <div className={cn(tilt)}>
      <article className="card-lift glass relative overflow-hidden rounded-[10px] p-7">
        {/* ruled baseline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0 34px, rgba(148,178,255,0.12) 34px 35px)",
          }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 font-display text-sm font-bold text-white">
              {topper.initials}
            </span>
            {/* rubber stamp */}
            <span className="inline-block -rotate-3 rounded border-2 border-signal/70 px-2.5 py-1 text-center font-display text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-signal">
              {topper.tag}
            </span>
          </div>
          <p className="mt-6 font-display text-5xl font-bold tabular-nums tracking-tight text-white">
            {topper.score}
          </p>
          <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-white/10 pt-3">
            <p className="font-display text-base font-bold text-white">{topper.name}</p>
            <p className="text-right text-xs leading-snug text-muted">{topper.detail}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
