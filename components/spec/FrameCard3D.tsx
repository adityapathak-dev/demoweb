"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { inr, type Frame } from "@/lib/spec";

type Props = {
  frame: Frame;
  wished: boolean;
  onToggleWish: (sku: string) => void;
  onQuickView: (frame: Frame) => void;
};

export default function FrameCard3D({ frame, wished, onToggleWish, onQuickView }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { add } = useCart();
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });
  const [swatch, setSwatch] = useState(0);
  const pct = Math.round((1 - frame.price / frame.mrp) * 100);
  const SWATCHES = [
    { label: "Noir", dot: "#1A1A1A" },
    { label: "Smoke", dot: "#6B6B6B" },
    { label: "Sand", dot: "#C4C4C4" },
  ];

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) translateY(-4px)`;
    setGlare({ x: ((x + 0.5) * 100).toFixed(1) as unknown as number, y: ((y + 0.5) * 100).toFixed(1) as unknown as number, on: true });
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
    setGlare((g) => ({ ...g, on: false }));
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card card-lift group relative overflow-hidden transition-transform duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={frame.photo}
          alt={frame.photoAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {/* Mouse-tracked soft glare — white only, keeps real photo honest */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.on ? 1 : 0,
            background: `radial-gradient(60% 55% at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 45%, transparent 70%)`,
          }}
        />
        {frame.tag ? (
          <span
            className="absolute left-3 top-3 rounded-lg bg-heading px-2.5 py-1 text-[10px] font-semibold text-white"
            style={{ transform: "translateZ(40px)" }}
          >
            {frame.tag} · −{pct}%
          </span>
        ) : (
          <span
            className="absolute left-3 top-3 rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold text-heading"
            style={{ transform: "translateZ(40px)" }}
          >
            −{pct}%
          </span>
        )}
        <span
          className="absolute bottom-2 left-3 rounded-lg border border-border bg-white px-2.5 py-1 text-[10px] font-medium text-ink"
          style={{ transform: "translateZ(30px)" }}
        >
          {frame.shape}
        </span>
        <button
          type="button"
          onClick={() => onToggleWish(frame.sku)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${frame.name} from wishlist` : `Save ${frame.name} to wishlist`}
          className={`absolute bottom-2 right-3 grid h-9 w-9 place-items-center rounded-lg border text-base transition-colors ${
            wished ? "border-heading bg-heading text-white" : "border-border bg-white text-ink hover:bg-sand"
          }`}
          style={{ transform: "translateZ(50px)" }}
        >
          <span aria-hidden>{wished ? "♥" : "♡"}</span>
        </button>
        {/* Hover quick-view pill — focus-visible for keyboard */}
        <button
          type="button"
          onClick={() => onQuickView(frame)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/95 px-4 py-2 text-xs font-medium text-ink opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-200 hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ transform: "translate(-50%,-50%) translateZ(60px)" }}
        >
          Quick view
        </button>
      </div>

      <div className="p-5">
        <p className="text-[11px] uppercase tracking-normal text-smoke">
          {frame.sku} · {frame.weight}
        </p>
        <h3 className="mt-1 text-lg font-medium leading-snug text-heading">{frame.name}</h3>
        <p className="mt-1 text-sm text-smoke">
          {frame.material} · suits {frame.best.toLowerCase()}
        </p>
        {typeof frame.rating === "number" && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-sand px-2 py-1 text-xs font-medium text-ink">
            <span aria-hidden>★</span> {frame.rating.toFixed(1)}
            {typeof frame.reviews === "number" && (
              <span className="font-normal text-smoke">· {frame.reviews} reviews</span>
            )}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="leading-none">
            <span className="block text-lg font-semibold text-heading">{inr(frame.price)}</span>
            <s className="mt-0.5 block text-xs font-normal text-disabled">{inr(frame.mrp)}</s>
          </p>
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                add({ sku: frame.sku, name: frame.name, photo: frame.photo, unit: frame.price, meta: `Standard · ${SWATCHES[swatch].label}` })
              }
              aria-label={`Add ${frame.name} to bag`}
              title="Add to bag"
              className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-white text-base text-ink transition-colors hover:bg-sand"
            >
              <span aria-hidden>+</span>
            </button>
            <Link
              href={`/book?frame=${frame.sku}`}
              aria-label={`Try ${frame.name} at home`}
              className="rounded-lg bg-black px-3.5 py-2 text-[11px] font-medium text-white transition-all hover:bg-ink"
            >
              Try at home
            </Link>
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5" role="group" aria-label={`${frame.name} colours — 3 in store`}>
            {SWATCHES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSwatch(i)}
                aria-pressed={swatch === i}
                aria-label={`${s.label} colourway`}
                title={s.label}
                style={{ background: s.dot }}
                className={`h-5 w-5 rounded-full border-2 transition-all ${swatch === i ? "border-heading scale-110" : "border-border hover:border-disabled"}`}
              />
            ))}
            <span className="ml-1 text-[11px] text-smoke">3 in store</span>
          </span>
          <button
            type="button"
            onClick={() => onQuickView(frame)}
            className="text-xs font-medium text-ink underline underline-offset-2 hover:text-smoke"
          >
            Quick view
          </button>
        </div>
      </div>
    </article>
  );
}
