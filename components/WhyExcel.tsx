import SectionHeading from "./SectionHeading";
import { WHY_POINTS } from "@/lib/content";

/** "Why Excel Academy" — sticky heading, ledger rows led by accent dashes. */
export default function WhyExcel() {
  return (
    <section className="relative border-y border-white/10 bg-navy/50">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[-20%] h-[26rem] w-[26rem] rounded-full bg-brand/15 blur-[130px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="h-fit lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Why Excel Academy"
            title={
              <>
                Individual attention.
                <br />
                Serious preparation.
              </>
            }
          />
          <div>
            <p className="mt-6 max-w-sm border-l-2 border-pulse/50 pl-4 text-sm leading-relaxed text-muted">
              Four decisions, kept for 12+ years. They are why a batch never
              crosses fifteen students.
            </p>
          </div>
        </div>
        <ol>
          {WHY_POINTS.map((point) => (
            <li key={point.title}>
              <div className="group border-t border-white/10 py-8 transition-colors duration-300 last:border-b hover:border-pulse/30">
                <span aria-hidden className="block h-px w-8 bg-pulse/70" />
                <h3 className="mt-4 font-display text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-x-2">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
