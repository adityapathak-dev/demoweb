"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FRAMES, inr } from "@/lib/spec";
import { cn } from "@/lib/utils";

const STAGE_SKUS = ["SP-CL01", "SP-RS03", "SP-CE04"];

/**
 * Atelier stage — a drag-to-rotate 3D product showcase. Pointer drag tilts
 * the frame card in perspective; idle sway keeps it alive; thumbnails swap
 * the staged frame. Frozen under prefers-reduced-motion.
 */
export default function HeroShowcase() {
  const frames = STAGE_SKUS.map((sku) => FRAMES.find((f) => f.sku === sku)!).filter(Boolean);
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [sway, setSway] = useState(0);
  const [dragging, setDragging] = useState(false);
  const frame = frames[active] ?? FRAMES[0];
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    let raf = 0;
    const t0 = Date.now();
    const tick = () => {
      setSway(Math.sin((Date.now() - t0) / 2600) * 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rotY = (drag?.x ?? 0) * 26 + (dragging || reduced.current ? 0 : sway);
  const rotX = (drag?.y ?? 0) * -10;

  function onPointerDown(e: React.PointerEvent) {
    if (reduced.current) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    move(e);
  }
  function move(e: React.PointerEvent) {
    if (!dragging || reduced.current) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDrag({
      x: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2)),
    });
  }
  function end() {
    setDragging(false);
    setDrag(null);
  }

  return (
    <div>
      <div style={{ perspective: "1400px" }}>
        <div
          role="application"
          aria-label={`${frame.name} — drag to rotate the showcase`}
          onPointerDown={onPointerDown}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
          className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{
            transform: `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`,
            transformStyle: "preserve-3d",
            transition: dragging ? "none" : "transform 0.5s ease-out",
          }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(64,52,32,0.08),0_32px_72px_rgba(64,52,32,0.14)]">
            <div className="relative aspect-[4/3]">
              <Image
                key={frame.sku}
                src={frame.photo}
                alt={frame.photoAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_60%_at_18%_0%,rgba(255,255,255,0.3),rgba(255,255,255,0.05)_45%,transparent_68%)]"
              />
            </div>
            {/* Floating depth layers */}
            <p
              data-depth="50"
              className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-[11px] font-medium text-ink shadow-[0_2px_8px_rgba(64,52,32,0.12)] backdrop-blur"
            >
              {frame.sku} · {frame.weight}
            </p>
            <p
              data-depth="80"
              className="absolute right-4 top-4 rounded-lg bg-heading px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_2px_8px_rgba(64,52,32,0.2)]"
            >
              {inr(frame.price)}{" "}
              <s className="ml-1 font-normal text-white/60">{inr(frame.mrp)}</s>
            </p>
            <div
              data-depth="110"
              className="absolute -bottom-1 left-4 right-4 flex translate-y-1/2 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(64,52,32,0.14)] sm:left-6 sm:right-auto sm:gap-8"
            >
              <span>
                <span className="block text-sm font-semibold text-heading">{frame.name}</span>
                <span className="block text-[11px] text-smoke">{frame.material}</span>
              </span>
              <Link
                href={`/product/${frame.sku}`}
                onPointerDown={(e) => e.stopPropagation()}
                className="shrink-0 rounded-lg bg-heading px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-ink"
              >
                View frame →
              </Link>
            </div>
          </div>
          {/* Gold atelier seal */}
          <span
            aria-hidden
            data-depth="130"
            className="absolute -right-3 -top-4 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-gold text-center text-[9px] font-semibold uppercase leading-tight text-heading shadow-[0_8px_20px_rgba(138,108,62,0.4)]"
          >
            SPEC
            <br />
            Atelier
          </span>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <div className="flex gap-2" role="group" aria-label="Stage a frame">
          {frames.map((f, i) => (
            <button
              key={f.sku}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`Stage ${f.name}`}
              className={cn(
                "relative h-14 w-20 overflow-hidden rounded-lg border-2 transition-all",
                active === i ? "border-gold" : "border-border opacity-70 hover:opacity-100"
              )}
            >
              <Image src={f.photo} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <p className="text-[11px] text-smoke" aria-hidden>
          {reduced.current ? "Atelier selection" : "Drag the frame to rotate · 3 views"}
        </p>
      </div>
    </div>
  );
}
