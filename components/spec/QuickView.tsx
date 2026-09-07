"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SHOP_WALL, inr, type Frame } from "@/lib/spec";
import { useCart } from "@/lib/cart";

const LENSES = [
  { id: "std", label: "Standard single-vision", add: 0, note: "Included" },
  { id: "blue", label: "Blue-cut", add: 600, note: "+₹600" },
  { id: "photo", label: "Photochromic", add: 1200, note: "+₹1,200" },
  { id: "hi", label: "1.67 high-index", add: 1800, note: "+₹1,800" },
] as const;

type Props = {
  frame: Frame | null;
  wished: boolean;
  onToggleWish: (sku: string) => void;
  onClose: () => void;
};

export default function QuickView({ frame, wished, onToggleWish, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // External sync only — no setState here, so no cascading renders.
  useEffect(() => {
    if (!frame) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [frame, onClose]);

  if (!frame) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view ${frame.name}`}
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div aria-hidden className="absolute inset-0 bg-heading/40" />
      {/* Remount per frame so lens + thumbnail state resets without an effect */}
      <QuickBody key={frame.sku} frame={frame} wished={wished} onToggleWish={onToggleWish} onClose={onClose} closeRef={closeRef} />
    </div>
  );
}

function QuickBody({
  frame,
  wished,
  onToggleWish,
  onClose,
  closeRef,
}: {
  frame: Frame;
  wished: boolean;
  onToggleWish: (sku: string) => void;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const [lens, setLens] = useState<(typeof LENSES)[number]["id"]>("std");
  const [view, setView] = useState(0);

  const pct = Math.round((1 - frame.price / frame.mrp) * 100);
  const lensAdd = LENSES.find((l) => l.id === lens)?.add ?? 0;
  const total = frame.price + lensAdd;
  const lensLabel = LENSES.find((l) => l.id === lens)?.label ?? "Standard single-vision";

  // Honest alternate views: main product shot + 2 in-store context shots.
  const views = [
    { src: frame.photo, alt: frame.photoAlt, label: frame.name },
    { src: SHOP_WALL[9].src, alt: SHOP_WALL[9].alt, label: "Sun wall in store" },
    { src: SHOP_WALL[10].src, alt: SHOP_WALL[10].alt, label: "Lit shelf at night" },
  ];
  const active = views[Math.min(view, views.length - 1)];

  function onTilt(e: React.MouseEvent) {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg)`;
  }
  function onTiltLeave() {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  }

  return (
    <div className="card relative grid max-h-[92vh] w-full max-w-4xl gap-0 overflow-y-auto sm:grid-cols-[1.05fr_0.95fr]">
      <div className="bg-sand p-4 sm:p-5">
        <div style={{ perspective: "1100px" }}>
          <div
            ref={tiltRef}
            onMouseMove={onTilt}
            onMouseLeave={onTiltLeave}
            className="relative overflow-hidden rounded-xl bg-white transition-transform duration-200 ease-out"
          >
            <div className="relative aspect-[4/3]">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_60%_at_18%_0%,rgba(255,255,255,0.26),rgba(255,255,255,0.05)_45%,transparent_68%)]"
              />
            </div>
            <span className="absolute left-3 top-3 rounded-lg bg-heading px-2.5 py-1 text-[10px] font-semibold text-white">
              −{pct}%
            </span>
            <span className="absolute bottom-3 left-3 rounded-lg border border-border bg-white px-2.5 py-1 text-[10px] font-medium text-ink">
              {active.label}
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              onClick={() => setView(i)}
              aria-pressed={view === i}
              aria-label={`View ${v.label}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition-colors ${
                view === i ? "border-heading" : "border-border hover:border-disabled"
              }`}
            >
              <Image src={v.src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-smoke">Move your mouse over the photo — it tilts in 3D. Alternate shots are in-store context.</p>
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase text-smoke">
              {frame.sku} · {frame.shape} · {frame.weight}
            </p>
            <h3 className="mt-1 text-xl font-semibold leading-snug text-heading">{frame.name}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-white text-ink hover:bg-sand"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        {typeof frame.rating === "number" && (
          <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-sand px-2 py-1 text-xs font-medium text-ink">
            <span aria-hidden>★</span> {frame.rating.toFixed(1)}
            {typeof frame.reviews === "number" && <span className="font-normal text-smoke">· {frame.reviews} verified reviews</span>}
          </p>
        )}

        <p className="mt-3 text-lg font-semibold text-heading">
          {inr(total)}{" "}
          <s className="ml-1 text-sm font-normal text-disabled">{inr(frame.mrp + lensAdd)}</s>{" "}
          <span className="ml-1 rounded-lg bg-heading px-2 py-0.5 align-middle text-[11px] font-semibold text-white">−{pct}%</span>
        </p>
        <p className="mt-1 text-sm text-smoke">
          {frame.material} · suits {frame.best.toLowerCase()}. Price includes lenses + fitting.
        </p>

        <fieldset className="mt-4">
          <legend className="text-xs font-medium uppercase text-smoke">Lens — quoted before cutting</legend>
          <div className="mt-2 grid gap-2">
            {LENSES.map((l) => (
              <label
                key={l.id}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                  lens === l.id ? "border-heading bg-white" : "border-border bg-white hover:bg-sand"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`lens-${frame.sku}`}
                    checked={lens === l.id}
                    onChange={() => setLens(l.id)}
                    className="accent-[#1A1A1A]"
                  />
                  <span className="text-ink">{l.label}</span>
                </span>
                <span className="text-xs text-smoke">{l.note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              add({ sku: frame.sku, name: frame.name, photo: frame.photo, unit: total, meta: lensLabel })
            }
            className="flex-1 rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Add to bag · {inr(total)}
          </button>
          <button
            type="button"
            onClick={() => onToggleWish(frame.sku)}
            aria-pressed={wished}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              wished ? "border-heading bg-heading text-white" : "border-border bg-white text-ink hover:bg-sand"
            }`}
          >
            {wished ? "♥ Saved" : "♡ Wishlist"}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <Link
            href={`/book?frame=${frame.sku}`}
            className="text-[13px] font-medium text-ink underline underline-offset-2 hover:text-smoke"
          >
            Try at home — free →
          </Link>
          <Link href="/book" className="text-[13px] font-medium text-smoke underline underline-offset-2 hover:text-heading">
            Book eye test
          </Link>
        </div>
      </div>
    </div>
  );
}
