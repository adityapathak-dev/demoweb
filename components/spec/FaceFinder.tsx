"use client";

import Link from "next/link";
import { useState } from "react";
import { FACE_SHAPES, type FaceShape } from "@/lib/spec";
import { cn } from "@/lib/utils";

/** Minimal line-art face outlines — one per shape, black/grey strokes only. */
function FaceOutline({ id }: { id: FaceShape["id"] }) {
  const common = "fill-none stroke-[#1A1A1A] stroke-[2.5]";
  switch (id) {
    case "oval":
      return <ellipse cx="100" cy="118" rx="60" ry="84" className={common} />;
    case "round":
      return <circle cx="100" cy="120" r="70" className={common} />;
    case "square":
      return <rect x="38" y="42" width="124" height="158" rx="20" className={common} />;
    case "heart":
      return <path d="M42 52 Q100 30 158 52 L122 196 Q100 208 78 196 Z" className={common} />;
    case "diamond":
      return <path d="M100 34 Q128 60 156 112 Q128 164 100 204 Q72 164 44 112 Q72 60 100 34 Z" className={common} />;
  }
}

/** Suggested frame silhouette drawn over the face — updates with selection. */
function FramesGlyph({ kind }: { kind: string }) {
  const frame = "fill-white/70 stroke-[#1A1A1A] stroke-[2.5]";
  const bridge = "stroke-[#1A1A1A] stroke-[2.5] fill-none";
  const y = 108;
  switch (kind) {
    case "Round":
      return (
        <g>
          <circle cx="72" cy={y} r="20" className={frame} />
          <circle cx="128" cy={y} r="20" className={frame} />
          <path d="M92 108 Q100 100 108 108 M52 104 L38 98 M148 104 L162 98" className={bridge} />
        </g>
      );
    case "Aviator":
      return (
        <g>
          <path d="M52 100 Q52 128 72 130 Q90 131 90 108 L90 100 Q70 96 52 100 Z" className={frame} />
          <path d="M110 100 L110 108 Q110 131 130 130 Q148 128 148 100 Q130 96 110 100 Z" className={frame} />
          <path d="M90 104 Q100 98 110 104" className={bridge} />
        </g>
      );
    case "Cat-eye":
      return (
        <g>
          <path d="M50 112 L56 94 L92 96 L90 116 Q70 120 50 112 Z" className={frame} />
          <path d="M110 96 L144 94 L150 112 Q130 120 110 116 Z" className={frame} />
          <path d="M92 102 Q100 98 110 102" className={bridge} />
        </g>
      );
    case "Oval":
      return (
        <g>
          <ellipse cx="72" cy={y} rx="22" ry="17" className={frame} />
          <ellipse cx="128" cy={y} rx="22" ry="17" className={frame} />
          <path d="M94 108 Q100 102 106 108 M50 106 L38 102 M150 106 L162 102" className={bridge} />
        </g>
      );
    case "Rimless":
      return (
        <g>
          <circle cx="72" cy={y} r="19" className="fill-none stroke-[#6B6B6B] stroke-[1.8] stroke-dasharray-[5_4]" />
          <circle cx="128" cy={y} r="19" className="fill-none stroke-[#6B6B6B] stroke-[1.8] stroke-dasharray-[5_4]" />
          <path d="M91 108 Q100 102 109 108" className={bridge} />
        </g>
      );
    case "Rectangle":
      return (
        <g>
          <rect x="50" y="94" width="44" height="26" rx="4" className={frame} />
          <rect x="106" y="94" width="44" height="26" rx="4" className={frame} />
          <path d="M94 104 L106 104" className={bridge} />
        </g>
      );
    case "Geometric":
      return (
        <g>
          <path d="M54 96 L72 90 L90 96 L90 118 L72 124 L54 118 Z" className={frame} />
          <path d="M110 96 L128 90 L146 96 L146 118 L128 124 L110 118 Z" className={frame} />
          <path d="M90 104 Q100 98 110 104" className={bridge} />
        </g>
      );
    case "Square":
    default:
      return (
        <g>
          <rect x="50" y="92" width="44" height="32" rx="6" className={frame} />
          <rect x="106" y="92" width="44" height="32" rx="6" className={frame} />
          <path d="M94 104 Q100 98 106 104 M50 100 L38 96 M150 100 L162 96" className={bridge} />
        </g>
      );
  }
}

/**
 * Face-shape finder — selecting a shape redraws the diagram AND the advice
 * side-by-side (desktop) / stacked (mobile). Stylist tips kept verbatim.
 */
export default function FaceFinder() {
  const [active, setActive] = useState<FaceShape>(FACE_SHAPES[0]);

  return (
    <section aria-labelledby="face-h" className="border-y border-border bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="reveal text-xs font-medium uppercase text-smoke">03 — Find your fit</p>
        <div className="mt-2 flex max-w-2xl flex-col gap-2">
          <h2 id="face-h" className="reveal text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
            Faces first, frames second.
          </h2>
          <p className="reveal text-sm leading-relaxed text-smoke">
            Pick the shape closest to yours. The diagram and the advice update together — then shop the shapes that suit you.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* Left: selector + live diagram */}
          <div className="card reveal p-6 sm:p-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose your face shape">
              {FACE_SHAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s)}
                  aria-pressed={active.id === s.id}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    active.id === s.id ? "border-black bg-black text-white" : "border-border bg-white text-ink hover:bg-sand"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-6 grid place-items-center rounded-xl bg-sand p-6" aria-live="polite">
              <svg key={active.id} viewBox="0 0 200 240" role="img" aria-label={`${active.label} face diagram with suggested ${active.frames[0]} frames`} className="h-64 w-auto animate-[fade-in_0.4s_ease_both]">
                <FaceOutline id={active.id} />
                {/* faint centre guide */}
                <line x1="100" y1="20" x2="100" y2="220" className="stroke-[#C4C4C4] stroke-[1] stroke-dasharray-[4_4]" />
                <FramesGlyph kind={active.frames[0]} />
              </svg>
              <p className="mt-3 text-xs text-smoke">
                {active.label} face · shown with {active.frames[0].toLowerCase()} frames
              </p>
            </div>
          </div>

          {/* Right: result panel — remounts per shape for a layered fade/slide */}
          <div className="card reveal flex flex-col p-6 sm:p-8" style={{ ["--reveal-delay" as string]: "120ms" }} aria-live="polite">
            <div key={active.id} className="flex flex-1 animate-[fade-in_0.45s_ease_both] flex-col">
            <p className="text-[11px] font-medium uppercase text-smoke">The {active.label} face</p>
            <h3 className="mt-1 text-2xl font-semibold text-heading">{active.blurb.split(".")[0]}.</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-smoke">{active.blurb}</p>
            <p className="mt-5 text-xs font-medium uppercase text-smoke">Try these silhouettes</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {active.frames.map((f) => (
                <li key={f} className="rounded-lg bg-sand px-3.5 py-1.5 text-sm font-medium text-ink">
                  {f}
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 border-l-2 border-gold pl-4 text-[15px] leading-relaxed text-ink">
              <span className="mb-1 block text-xs font-medium uppercase text-smoke">Stylist tip</span>
              {active.tip}
            </blockquote>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Link href="/collections" className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink">
                Shop {active.shopShape} frames →
              </Link>
              <Link href="/book" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand">
                Get fitted in store
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
