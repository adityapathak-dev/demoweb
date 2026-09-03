import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { CONTACT } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question? Want to book a demo class? Reach Excel Academy by phone, WhatsApp, email or the enquiry form.",
};

const CHANNELS = [
  { label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { label: "WhatsApp", value: "Chat on WhatsApp", href: CONTACT.whatsapp },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        accent="#ff7a59"
        title={
          <>
            Get in <span className="text-gradient-brand">touch.</span>
          </>
        }
        lede="Have a question? Want to book a demo class? We're here to help."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <Reveal>
            <div className="glass rounded-3xl p-7">
              <h2 className="font-display text-lg font-bold text-white">
                Contact Information
              </h2>
              <ul className="mt-5 space-y-4">
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-0.5 inline-block font-display text-lg font-bold text-white transition-colors hover:text-pulse"
                    >
                      {c.value}
                    </a>
                  </li>
                ))}
                <li>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
                    Location
                  </p>
                  <p className="mt-0.5 text-[15px] text-white">
                    {CONTACT.addressLines[0]}
                    <br />
                    {CONTACT.addressLines[1]}
                  </p>
                </li>
                <li>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
                    Working hours
                  </p>
                  {CONTACT.hoursLines.map((h) => (
                    <p key={h} className="mt-0.5 text-[15px] text-white">
                      {h}
                    </p>
                  ))}
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full bg-signal px-5 py-3 text-center font-display text-sm font-bold text-abyss transition-transform hover:scale-[1.02]"
                >
                  WhatsApp Us
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="flex-1 rounded-full border border-white/20 px-5 py-3 text-center font-display text-sm font-bold text-white transition-colors hover:border-pulse/60"
                >
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {/* Stylised "find us" panel — the reference holds a map embed slot;
                this keeps the composition intentional with zero fake embeds. */}
            <div className="dot-grid relative overflow-hidden rounded-3xl border border-white/10 bg-navy p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warm/25 blur-[60px]"
              />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-faint">
                Find us
              </p>
              <p className="mt-2 font-display text-xl font-bold text-white">
                Near City Park, New Delhi
              </p>
              <p className="mt-1 text-sm text-muted">
                42, Knowledge Lane — a short walk from the park gates. Ask for Excel
                Academy at reception.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </section>
    </>
  );
}
