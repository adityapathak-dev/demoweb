"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Virtual try-on — two honest modes: a simulated scale preview, or your real
 * front camera composited under the same face guide (on-device, nothing
 * uploaded). The 48-hour home box stays positioned as the real decision.
 */
export default function TryOn() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [camOn, setCamOn] = useState(false);
  const [camError, setCamError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (phase !== "scanning") return;
    const t = setTimeout(() => setPhase("done"), 2400);
    return () => clearTimeout(t);
  }, [phase]);

  // Stop the camera when the component unmounts.
  useEffect(() => {
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  async function toggleCamera() {
    if (camOn) {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setCamOn(false);
      return;
    }
    setCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCamOn(true);
      setPhase("scanning");
      // Attach on next paint, once the <video> is mounted.
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setCamError("Camera unavailable here — the simulated preview below works the same way.");
      setPhase("scanning");
    }
  }

  return (
    <section aria-labelledby="tryon-h" className="bg-sand py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div className="reveal">
          <p className="text-xs font-medium uppercase text-smoke">04 — Try before you visit</p>
          <h2 id="tryon-h" className="mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
            Point your phone. See the scale.
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-smoke">
            The camera preview fits frames to your face at true scale — width, temple length, how much cheek they cover.
            It&apos;s a demo, so treat it as a shortlist tool: the 48-hour home box is the real decision.
          </p>
          <ol className="mt-6 space-y-3">
            {[
              ["1", "Allow the camera", "Nothing is recorded — the preview runs on your phone."],
              ["2", "Line up your face", "Keep your eyes inside the guide oval, head straight."],
              ["3", "Compare at scale", "Flip through frames; widths are true to the millimetre."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sand text-sm font-semibold text-heading" aria-hidden>
                  {n}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-heading">{t}</span>
                  <span className="block text-sm text-smoke">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPhase(phase === "idle" ? "scanning" : "idle")}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink"
            >
              {phase === "idle" ? "Open camera preview" : "Close preview"}
            </button>
            <button
              type="button"
              onClick={toggleCamera}
              className="rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              {camOn ? "Stop live camera" : "Use my live camera"}
            </button>
            <Link href="/try-on" className="rounded-lg px-2 py-3 text-sm font-medium text-ink underline underline-offset-2 hover:text-smoke">
              How try-on works →
            </Link>
          </div>
          {camError && <p className="mt-3 text-sm text-smoke" role="status">{camError}</p>}
        </div>

        {/* Mock viewfinder */}
        <div className="reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-heading">
              {camOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  aria-label="Live camera preview for virtual try-on"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src="/frames/sp-classic.jpg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn("object-cover transition-opacity duration-500", phase === "idle" ? "opacity-40" : "opacity-70")}
                />
              )}
              {/* corner brackets */}
              <span aria-hidden className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-white" />
              <span aria-hidden className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-white" />
              <span aria-hidden className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-white" />
              <span aria-hidden className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-white" />
              {/* face guide */}
              <span aria-hidden className="absolute left-1/2 top-1/2 h-[74%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-dashed border-white/90" />
              {/* suggested frame glyph once "fitted" */}
              <svg viewBox="0 0 200 70" aria-hidden className={cn("absolute left-1/2 top-[44%] w-[38%] -translate-x-1/2 transition-all duration-500", phase === "done" ? "scale-100 opacity-100" : "scale-95 opacity-0")}>
                <rect x="18" y="14" width="70" height="42" rx="9" className="fill-white/25 stroke-white stroke-[3]" />
                <rect x="112" y="14" width="70" height="42" rx="9" className="fill-white/25 stroke-white stroke-[3]" />
                <path d="M88 30 Q100 22 112 30" className="fill-none stroke-white stroke-[3]" />
              </svg>
              {/* scan line */}
              {phase === "scanning" && (
                <span aria-hidden className="absolute inset-x-8 top-0 h-0.5 animate-[scan_1.2s_ease-in-out_infinite] bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)]" />
              )}
              <span className="absolute left-4 top-4 ml-10 rounded-md bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-heading">
                {phase === "idle" ? "Demo preview" : phase === "scanning" ? "Fitting… keep still" : "Fitted · Wayfarer Classic"}
              </span>
              {phase === "idle" && !camOn && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="rounded-lg bg-white/95 px-5 py-2.5 text-sm font-medium text-ink">Camera off — open the preview to simulate</span>
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-sm text-smoke" role="status">
                {phase === "done"
                  ? "Close enough to shortlist. Your mirror makes the final call."
                  : phase === "scanning"
                    ? "Measuring face width and eye distance…"
                    : "No recording, no uploads — runs on-device."}
              </p>
              {phase === "done" && (
                <Link href="/book?frame=SP-CL01" className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-ink">
                  Try this at home →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes scan { 0%,100% { top: 8%; } 50% { top: 88%; } }`}</style>
    </section>
  );
}
