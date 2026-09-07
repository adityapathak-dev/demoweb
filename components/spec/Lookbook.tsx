import Image from "next/image";
import Link from "next/link";
import { LOOKBOOK } from "@/lib/spec";
import { cn } from "@/lib/utils";

function IgIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Lookbook as a masonry grid — varied heights, hover overlay with the
 * Instagram mark. Handles are demo placeholders until real UGC lands.
 */
export default function Lookbook() {
  return (
    <section aria-labelledby="look-h" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="reveal text-xs font-medium uppercase text-smoke">07 — Worn out there</p>
            <h2 id="look-h" className="reveal mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
              Seen on regulars, not models.
            </h2>
            <p className="reveal mt-2 text-sm text-smoke">Tag @specstudio.hyd to land on this wall.</p>
          </div>
          <Link href="/contact" className="reveal rounded-lg border border-border px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-sand">
            Visit the store →
          </Link>
        </div>

        <ul className="mt-8 columns-2 gap-3 md:columns-3 [&>*]:mb-3">
          {LOOKBOOK.map((l, i) => (
            <li key={l.src} className={cn("reveal break-inside-avoid")} style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}>
              <figure className="group relative overflow-hidden rounded-xl bg-sand">
                <span className={cn("relative block w-full overflow-hidden", l.tall ? "aspect-[3/4]" : "aspect-square")}>
                  <Image
                    src={l.src}
                    alt={l.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-heading/55 text-white opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <IgIcon />
                  <span className="text-sm font-medium">{l.handle}</span>
                  <span className="text-xs text-white/80">{l.frame}</span>
                </span>
                <figcaption className="flex items-center justify-between gap-2 p-3">
                  <span className="truncate text-xs font-medium text-ink">{l.handle}</span>
                  <span className="shrink-0 truncate text-[11px] text-smoke">{l.frame}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
