const FAQS = [
  { q: "How much do frames actually cost?", a: "Frames start at ₹1,499 all-in — that's frame + single-vision lenses + fitting on the counter. Designer frames go up to ₹8,999. Add-ons like blue-cut and photochromic are quoted before cutting, never after." },
  { q: "How long until my glasses are ready?", a: "Order before 4 PM and pick it up the same day. Lenses are cut in-store in ~45 minutes — you can watch through the glass door and grab a free chai while you wait." },
  { q: "Do you accept insurance?", a: "Yes — we issue GST bills that every insurer and corporate reimbursement plan accepts. We're not a network partner for most insurers, but we help with all the paperwork at the counter." },
  { q: "Can kids get eye tests here?", a: "Free for ages 5+. We use picture-based charts, skip the scary equipment, and keep flexible, unbreakable frames for little faces. Spring adjustments are free for a year." },
  { q: "How does home try-on work?", a: "Pick up to 5 frames, we courier them to Madhapur, Gachibowli or Jubilee Hills for a 48-hour trial. Free pickup afterwards, no card held. Choose in your own mirror, not under a fluorescent light." },
  { q: "What's the warranty and return policy?", a: "14-day no-questions exchange on frames, 1-year warranty on every pair — including coatings. If the anti-scratch layer peels, we recoat it free." },
];

export default function SpecFAQ() {
  return (
    <section aria-labelledby="faq-h" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-normal text-smoke">09 — Questions, answered</p>
        <h2 id="faq-h" className="mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
          The things people ask at the counter.
        </h2>
        <div className="mt-8 divide-y divide-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-lg transition-colors open:bg-sand/50" open={false}>
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-4 py-4 text-[15px] font-medium text-heading [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-xl font-light text-smoke transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-sm leading-relaxed text-smoke">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}