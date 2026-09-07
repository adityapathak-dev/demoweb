import { TESTIMONIALS } from "@/lib/spec";

export default function SpecTestimonials() {
  return (
    <section aria-labelledby="love-h" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="reveal text-xs font-medium uppercase tracking-normal text-smoke">08 — Wall of love</p>
        <h2 id="love-h" className="reveal mt-2 max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
          2,300+ reviews. We printed the blunt ones.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <figure className="card reveal flex flex-col justify-between p-7 md:row-span-2" style={{ ["--reveal-delay" as string]: "0ms" }}>
            <div>
              <p className="text-xs text-smoke" aria-label="5 out of 5 stars">★★★★★ · Google</p>
              <blockquote className="mt-4 text-xl font-medium leading-snug text-heading">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</blockquote>
            </div>
            <figcaption className="mt-8 border-t border-border pt-4">
              <p className="font-medium text-heading">{TESTIMONIALS[0].name}</p>
              <p className="text-xs text-smoke">{TESTIMONIALS[0].area} · {TESTIMONIALS[0].detail}</p>
            </figcaption>
          </figure>

          <figure className="card reveal p-7" style={{ ["--reveal-delay" as string]: "80ms" }}>
            <p className="text-xs text-smoke">★★★★★ · Justdial</p>
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[1].quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-smoke">{TESTIMONIALS[1].name} · {TESTIMONIALS[1].area}</figcaption>
          </figure>

          <figure className="card reveal p-7" style={{ ["--reveal-delay" as string]: "140ms" }}>
            <p className="text-xs text-smoke">★★★★★ · Walk-in card</p>
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[2].quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-smoke">{TESTIMONIALS[2].name} · {TESTIMONIALS[2].area}</figcaption>
          </figure>

          <figure className="card reveal p-7 md:col-span-2" style={{ ["--reveal-delay" as string]: "200ms" }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-smoke">★★★★★ · Google</p>
                <blockquote className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[3].quote}&rdquo;</blockquote>
              </div>
              <span className="rounded-lg bg-heading px-3 py-1 text-xs font-medium text-white">FAMILY PACK −15%</span>
            </div>
            <figcaption className="mt-3 text-sm text-smoke">{TESTIMONIALS[3].name} · {TESTIMONIALS[3].area} · {TESTIMONIALS[3].detail}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}