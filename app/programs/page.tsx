import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProgramsExplorer from "@/components/ProgramsExplorer";
import ConstellationCanvas from "@/components/three/ConstellationCanvas";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { CONTACT } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Structured coaching programs for Classes 8–12, covering board exams and competitive entrance preparation. Small batches, max 15 students.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumb="Programs"
        title={
          <>
            Our <span className="text-gradient-brand">programs.</span>
          </>
        }
        lede="Structured coaching programs for Classes 8–12, covering board exams and competitive entrance preparation."
      />

      {/* ascending constellation — the learner's journey as rising bodies */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem]">
            <ConstellationCanvas />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-abyss/90 to-transparent p-6 sm:p-8">
              <p className="font-display text-sm font-bold tracking-[0.2em] text-white uppercase">
                Class 8 → Class 12 · one journey
              </p>
              <p className="hidden text-xs tracking-[0.2em] text-faint uppercase sm:block">
                Boards · JEE · NEET
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <ProgramsExplorer />
      </section>

      {/* personalised band */}
      <section className="border-t border-white/10 bg-navy/50">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Can&apos;t find what you&apos;re looking for?{" "}
              <span className="text-gradient-brand">We offer personalised programs too.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-4">
            <MagneticButton href="/contact">Contact Us</MagneticButton>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-signal/50 bg-signal/10 px-7 py-3.5 font-display text-sm font-bold text-signal transition-colors hover:bg-signal hover:text-abyss"
            >
              WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
