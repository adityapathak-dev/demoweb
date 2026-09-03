import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import DemoForm from "./DemoForm";
import MagneticButton from "./MagneticButton";
import { CONTACT } from "@/lib/theme";

/** Final CTA — contact channels + demo form, the conversion moment. */
export default function DemoCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[150px]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Get started"
            tone="warm"
            title={
              <>
                See if Excel is right <span className="serif-accent text-gradient-brand">for your child.</span>
              </>
            }
            lede="Book a free demo class. No fees, no pressure — just a chance to experience our teaching approach."
          />
          <Reveal delay={120}>
            <ul className="mt-8 space-y-3 text-[15px]">
              <li>
                <a href={CONTACT.phoneHref} className="font-display font-bold text-white transition-colors hover:text-pulse">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-muted transition-colors hover:text-pulse"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-muted">
                {CONTACT.addressLines[0]}, {CONTACT.addressLines[1]}
              </li>
              <li className="text-muted">{CONTACT.hoursLines[0]}</li>
            </ul>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="/contact">Book a Demo</MagneticButton>
              <MagneticButton href="/results" variant="ghost">
                See our results
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
