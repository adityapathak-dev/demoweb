import Link from "next/link";

export default function SpecPageHero({ kicker, title, copy, cta }: { kicker: string; title: React.ReactNode; copy: string; cta?: { href: string; label: string } }) {
  return (
    <section className="border-b border-border bg-white pt-[112px]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-normal text-smoke">{kicker}</p>
        <h1 className="mt-2 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-smoke">{copy}</p>
        {cta && (
          <Link href={cta.href} className="mt-6 inline-block rounded-lg bg-heading px-5 py-2.5 text-[13px] font-medium text-white hover:bg-ink transition-colors">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}