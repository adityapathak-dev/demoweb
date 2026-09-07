import Image from "next/image";
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
              <p className="text-xs text-smoke" aria-label="5 out of 5 stars"><span className="text-gold" aria-hidden>★★★★★</span> · Google</p>
              <blockquote className="mt-4 text-xl font-medium leading-snug text-heading">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-4">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-sand">
                <Image src={TESTIMONIALS[0].face} alt={TESTIMONIALS[0].faceAlt} fill sizes="44px" className="object-cover" loading="lazy" />
              </span>
              <span>
                <span className="block font-medium text-heading">{TESTIMONIALS[0].name}</span>
                <span className="block text-xs text-smoke">{TESTIMONIALS[0].area} · {TESTIMONIALS[0].detail}</span>
              </span>
            </figcaption>
          </figure>

          <figure className="card reveal p-7" style={{ ["--reveal-delay" as string]: "80ms" }}>
            <p className="text-xs text-smoke"><span className="text-gold" aria-hidden>★★★★★</span> · Justdial</p>
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[1].quote}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 text-sm text-smoke">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-sand">
                <Image src={TESTIMONIALS[1].face} alt={TESTIMONIALS[1].faceAlt} fill sizes="36px" className="object-cover" loading="lazy" />
              </span>
              {TESTIMONIALS[1].name} · {TESTIMONIALS[1].area}
            </figcaption>
          </figure>

          <figure className="card reveal p-7" style={{ ["--reveal-delay" as string]: "140ms" }}>
            <p className="text-xs text-smoke"><span className="text-gold" aria-hidden>★★★★★</span> · Walk-in card</p>
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[2].quote}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 text-sm text-smoke">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-sand">
                <Image src={TESTIMONIALS[2].face} alt={TESTIMONIALS[2].faceAlt} fill sizes="36px" className="object-cover" loading="lazy" />
              </span>
              {TESTIMONIALS[2].name} · {TESTIMONIALS[2].area}
            </figcaption>
          </figure>

          <figure className="card reveal p-7 md:col-span-2" style={{ ["--reveal-delay" as string]: "200ms" }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-smoke"><span className="text-gold" aria-hidden>★★★★★</span> · Google</p>
                <blockquote className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink">&ldquo;{TESTIMONIALS[3].quote}&rdquo;</blockquote>
              </div>
              <span className="rounded-lg bg-heading px-3 py-1 text-xs font-medium text-white">FAMILY PACK −15%</span>
            </div>
            <figcaption className="mt-3 flex items-center gap-2.5 text-sm text-smoke">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-sand">
                <Image src={TESTIMONIALS[3].face} alt={TESTIMONIALS[3].faceAlt} fill sizes="36px" className="object-cover" loading="lazy" />
              </span>
              {TESTIMONIALS[3].name} · {TESTIMONIALS[3].area} · {TESTIMONIALS[3].detail}
            </figcaption>
          </figure>
        </div>
        <p className="mt-6 text-center text-[11px] text-smoke/70">Demo photography: portraits are stand-ins — replace with real reviewers before launch.</p>
      </div>
    </section>
  );
}