import Link from "next/link";
import SpecPageHero from "@/components/spec/PageHero";

export const metadata = { title: "Sitemap" };

const GROUPS: { h: string; links: { href: string; label: string }[] }[] = [
  {
    h: "Shop",
    links: [
      { href: "/shop/eyeglasses", label: "Eyeglasses" },
      { href: "/shop/sunglasses", label: "Sunglasses" },
      { href: "/shop/screen", label: "Blue-cut screen glasses" },
      { href: "/shop/titanium", label: "Titanium & metal" },
      { href: "/collections", label: "All frames" },
    ],
  },
  {
    h: "Eye care",
    links: [
      { href: "/book", label: "Book free eye test" },
      { href: "/services", label: "Services & lab" },
      { href: "/try-on", label: "Virtual try-on" },
      { href: "/face-shape-guide", label: "Face shape guide" },
      { href: "/prescription-guide", label: "Prescription guide" },
      { href: "/lens-technology", label: "Lens technology" },
    ],
  },
  {
    h: "Studio",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/stores", label: "Stores" },
      { href: "/contact", label: "Visit / contact" },
    ],
  },
  {
    h: "Support",
    links: [
      { href: "/track-order", label: "Track order" },
      { href: "/faq", label: "FAQ & shipping" },
      { href: "/warranty", label: "Warranty registration" },
    ],
  },
  {
    h: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <SpecPageHero
        kicker="Index · Everything"
        title={<>Every corner of the studio.</>}
        copy="All pages, no dead ends. Anything missing here is a bug — tell us at the counter."
      />
      <section aria-label="Sitemap" className="bg-paper py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <nav key={g.h} aria-label={g.h} className="card p-6">
              <p className="text-[11px] font-medium uppercase tracking-wider text-golddeep">{g.h}</p>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-[15px] text-ink transition-colors hover:text-heading hover:underline hover:underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="card bg-heading p-6 shadow-none!">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gold">Start here</p>
            <p className="mt-3 font-medium text-paper">New to SPEC? The eye test is free and takes 20 minutes.</p>
            <Link href="/book" className="mt-4 inline-block rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-golddeep hover:text-white">
              Book a slot →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
