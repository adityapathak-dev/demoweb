"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FRAMES, SHAPES, type Frame } from "@/lib/spec";
import FrameCard3D from "./FrameCard3D";
import QuickView from "./QuickView";

type Sort = "popular" | "price-asc" | "price-desc" | "discount";

const SORTS: { id: Sort; label: string }[] = [
  { id: "popular", label: "Most loved" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "discount", label: "Biggest saving" },
];

function discount(f: Frame) {
  return 1 - f.price / f.mrp;
}

export default function SpecCollections({ limit }: { limit?: number }) {
  const isTeaser = typeof limit === "number";
  const [shape, setShape] = useState<(typeof SHAPES)[number]>("All");
  const [sort, setSort] = useState<Sort>("popular");
  const [wishOnly, setWishOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = window.localStorage.getItem("spec-wishlist");
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [quick, setQuick] = useState<Frame | null>(null);

  function toggleWish(sku: string) {
    setWishlist((w) => {
      const next = w.includes(sku) ? w.filter((s) => s !== sku) : [...w, sku];
      try {
        localStorage.setItem("spec-wishlist", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const frames = useMemo(() => {
    let list = [...FRAMES];
    if (!isTeaser) {
      if (shape !== "All") list = list.filter((f) => f.shape === shape);
      if (wishOnly) list = list.filter((f) => wishlist.includes(f.sku));
    } else if (limit) {
      list = list.slice(0, limit);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list.sort((a, b) => discount(b) - discount(a));
        break;
      default:
        list.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
        break;
    }
    return list;
  }, [shape, sort, wishOnly, wishlist, isTeaser, limit]);

  return (
    <section aria-labelledby="frames-h" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="reveal">
            <p className="text-xs font-medium uppercase tracking-normal text-smoke">02 — The shelf</p>
            <h2 id="frames-h" className="mt-2 max-w-xl text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
              Hand-picked shelf. Zero duds. Every pair tried on 200+ real faces.
            </h2>
            <p className="mt-2 text-sm text-smoke">Hover any real photo — it tilts in 3D. Tap for quick view.</p>
          </div>
          <Link href="/collections" className="reveal rounded-lg border border-border bg-white px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-white">
            All 120+ in store →
          </Link>
        </div>

        {!isTeaser && (
          <div className="reveal mt-8 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-border" role="group" aria-label="Filter by shape">
              {SHAPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShape(s)}
                  aria-pressed={shape === s}
                  className={`relative pb-2.5 pt-1 text-sm transition-colors ${
                    shape === s ? "font-semibold text-heading" : "font-normal text-smoke hover:text-heading"
                  }`}
                >
                  {s}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-heading transition-all duration-200 ${
                      shape === s ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
              <p className="text-xs text-smoke" aria-live="polite">
                {frames.length} of {FRAMES.length} online · {wishlist.length} saved
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 text-xs text-smoke">
                  <input
                    type="checkbox"
                    checked={wishOnly}
                    onChange={(e) => setWishOnly(e.target.checked)}
                    className="h-4 w-4 accent-[#1A1A1A]"
                  />
                  Wishlist only
                </label>
                <label className="text-xs text-smoke">
                  <span className="sr-only">Sort frames</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink"
                  >
                    {SORTS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        )}

        {frames.length === 0 ? (
          <div className="card mt-10 p-10 text-center">
            <p className="font-medium text-heading">Nothing saved here yet</p>
            <p className="mt-1 text-sm text-smoke">Tap the ♡ on any frame and it will wait for you here.</p>
            <button
              type="button"
              onClick={() => {
                setWishOnly(false);
                setShape("All");
              }}
              className="mt-4 rounded-lg bg-heading px-4 py-2 text-xs font-medium text-white hover:bg-ink"
            >
              Show everything
            </button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frames.map((f, i) => {
              const off = i % 3 === 1 ? "lg:translate-y-6" : "";
              return (
                <li key={f.sku} className={`reveal ${off}`} style={{ ["--reveal-delay" as string]: `${Math.min(i, 8) * 70}ms` }}>
                  <FrameCard3D frame={f} wished={wishlist.includes(f.sku)} onToggleWish={toggleWish} onQuickView={setQuick} />
                </li>
              );
            })}

            <li key="cta" className="reveal" style={{ ["--reveal-delay" as string]: `${Math.min(frames.length, 8) * 70}ms` }}>
              <article className="card card-lift group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/frames/sp-glow.jpg"
                    alt="Illuminated display shelf with dozens of frames inside the SPEC store"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-lg bg-heading px-2.5 py-1 text-[10px] font-semibold uppercase text-white">
                    In store
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-snug text-heading">120+ frames in store</h3>
                  <p className="mt-1 text-sm text-smoke">Come try them all — free eye test with any pair, same-day lenses.</p>
                  <Link href="/book" className="mt-4 inline-block rounded-lg bg-heading px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-ink">
                    Book a visit →
                  </Link>
                </div>
              </article>
            </li>
          </ul>
        )}
        <p className="reveal mt-10 text-center text-xs text-smoke">
          Prices include single-vision lenses + fitting. High-index &amp; photochromic quoted before cutting — never after.
        </p>
        <p className="mt-3 text-center text-[11px] text-smoke/70">
          Demo photography: Unsplash stand-ins — replace with in-store shots before launch.
        </p>
      </div>
      <QuickView frame={quick} wished={quick ? wishlist.includes(quick.sku) : false} onToggleWish={toggleWish} onClose={() => setQuick(null)} />
    </section>
  );
}
