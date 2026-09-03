import Reveal from "./Reveal";
import { TESTIMONIAL } from "@/lib/content";

/**
 * Parent voice — set as an editorial pull-quote: left-aligned, oversized
 * serif, ruled meta. Deliberately asymmetric against the page's
 * centered moments. (Warm coral stays the human-voice tone.)
 */
export default function Testimonial() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-warm lg:sticky lg:top-32">
            What
            <br className="hidden lg:block" /> parents say
          </p>
        </Reveal>
        <Reveal delay={100}>
          <blockquote>
            <p aria-hidden className="serif-accent text-7xl leading-none text-warm/60">
              &ldquo;
            </p>
            <p className="serif-accent -mt-4 max-w-4xl text-2xl leading-snug text-white sm:text-[2.5rem] sm:leading-[1.22]">
              {TESTIMONIAL.quote}
            </p>
            <footer className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6">
              <span className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-warm font-display text-sm font-bold text-abyss">
                  {TESTIMONIAL.initials}
                </span>
                <span>
                  <span className="block font-display font-bold text-white">
                    {TESTIMONIAL.name}
                  </span>
                  <span className="block text-sm text-muted">{TESTIMONIAL.role}</span>
                </span>
              </span>
              <span className="rounded-full border border-warm/40 bg-warm/10 px-4 py-1.5 font-display text-xs font-bold tabular-nums text-warm">
                {TESTIMONIAL.delta}
              </span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
