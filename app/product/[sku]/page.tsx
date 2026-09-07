import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FRAMES, SHOP_WALL, inr, type Frame } from "@/lib/spec";
import BuyBox from "@/components/spec/BuyBox";
import SpecBooking from "@/components/spec/Booking";

export function generateStaticParams() {
  return FRAMES.map((f) => ({ sku: f.sku }));
}

export function generateMetadata({ params }: { params: Promise<{ sku: string }> }) {
  return params.then((p) => {
    const f = FRAMES.find((x) => x.sku === p.sku);
    return { title: f ? `${f.name} · ${inr(f.price)}` : "Frame" };
  });
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 text-sm last:border-0">
      <dt className="shrink-0 text-smoke">{k}</dt>
      <dd className="text-right font-medium text-heading">{v}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const frame = FRAMES.find((f) => f.sku === sku);
  if (!frame) notFound();
  const pct = Math.round((1 - frame.price / frame.mrp) * 100);
  const related = FRAMES.filter((f) => f.sku !== frame.sku && f.line === frame.line).slice(0, 3);
  const views = [
    { src: frame.photo, alt: frame.photoAlt, label: frame.name },
    { src: SHOP_WALL[0].src, alt: SHOP_WALL[0].alt, label: "On the wall in store" },
    { src: SHOP_WALL[10].src, alt: SHOP_WALL[10].alt, label: "Lit shelf at night" },
  ];

  return (
    <>
      <section className="bg-paper pt-[100px]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-smoke">
            <Link href="/" className="hover:text-heading">Home</Link>
            <span aria-hidden> · </span>
            <Link href={`/shop/${frame.line === "eyeglasses" ? "eyeglasses" : "sunglasses"}`} className="hover:text-heading">
              {frame.line === "eyeglasses" ? "Eyeglasses" : "Sunglasses"}
            </Link>
            <span aria-hidden> · </span>
            <span aria-current="page" className="text-heading">{frame.name}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(64,52,32,0.08)]">
                <div className="relative aspect-[4/3]">
                  <Image src={frame.photo} alt={frame.photoAlt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
                </div>
                {frame.tag && (
                  <span className="absolute left-4 top-4 rounded-lg bg-heading px-3 py-1.5 text-[11px] font-semibold text-white">
                    {frame.tag} · −{pct}%
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {views.map((v) => (
                  <figure key={v.label} className="overflow-hidden rounded-xl bg-white">
                    <span className="relative block aspect-[4/3]">
                      <Image src={v.src} alt={v.alt} fill sizes="220px" className="object-cover" loading="lazy" />
                    </span>
                    <figcaption className="px-2 py-1.5 text-[10px] text-smoke">{v.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-normal text-smoke">{frame.sku} · {frame.shape} · {frame.weight}</p>
              <h1 className="mt-2 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-tight">{frame.name}</h1>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-sand px-2.5 py-1 text-xs font-medium text-ink">
                <span aria-hidden className="text-gold">★</span> {frame.rating?.toFixed(1)}
                <span className="font-normal text-smoke">· {frame.reviews} verified reviews</span>
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-smoke">
                {frame.material}. Cut for {frame.best.toLowerCase()} — fitted on your face in-store,
                with nose-pad and temple alignment included.
              </p>
              <div className="mt-5">
                <BuyBox frame={frame} />
              </div>
              <dl className="card mt-6 p-5">
                <SpecRow k="Material" v={frame.material} />
                <SpecRow k="Weight" v={frame.weight} />
                <SpecRow k="Suits" v={frame.best} />
                <SpecRow k="Lenses" v="Cut in-store · ~45 min" />
                <SpecRow k="Warranty" v="1 year · 14-day exchange" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Reviews" className="border-t border-border bg-sand py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Worn and rated</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [`Fits ${frame.best.split("+")[0].trim().toLowerCase()} faces beautifully. Power bang on first try.`, "Verified buyer · HITEC City"],
              [`Tried 5 at home, kept this one. The ${frame.material.split(",")[0].toLowerCase()} feels far above the price.`, "Home trial · Gachibowli"],
              ["Adjustment after two weeks was free and took ten minutes. They remembered my name.", "Walk-in · Jubilee Hills"],
            ].map(([q, w]) => (
              <li key={w as string} className="card p-6">
                <p className="text-xs text-gold" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote className="mt-2 text-sm leading-relaxed text-ink">&ldquo;{q}&rdquo;</blockquote>
                <p className="mt-3 text-xs text-smoke">{w}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-label="You may also like" className="bg-paper py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium text-heading">Pairs well with</h2>
              <Link href="/collections" className="text-sm font-medium text-ink underline underline-offset-2 hover:text-smoke">
                All frames →
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((f: Frame) => (
                <li key={f.sku}>
                  <Link href={`/product/${f.sku}`} className="card card-lift group block overflow-hidden" aria-label={`View ${f.name}`}>
                    <span className="relative block aspect-[4/3] overflow-hidden">
                      <Image src={f.photo} alt={f.photoAlt} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </span>
                    <span className="block p-5">
                      <span className="block font-medium text-heading">{f.name}</span>
                      <span className="mt-1 block text-sm text-smoke">{inr(f.price)} · {f.shape}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <SpecBooking compact />
    </>
  );
}
