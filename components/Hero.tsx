"use client";

import { useEffect, useRef } from "react";
import HeroCanvas from "./three/HeroCanvas";
import MagneticButton from "./MagneticButton";
import CountUp from "./CountUp";
import { HERO_STATS } from "@/lib/content";

/**
 * Hero — full-viewport editorial composition over the 3D centerpiece.
 * The canvas drifts gently on scroll (parallax), copy stays pinned left.
 * Mobile gets its own stacked composition: copy → scene → stats.
 */
export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = visualRef.current;
        if (!el) return;
        const y = Math.min(window.scrollY, window.innerHeight);
        el.style.transform = `translateY(${y * 0.12}px) scale(${1 + y / 8000})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* atmospheric light sources on the deep-navy base */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand/25 blur-[140px]" />
        <div className="absolute right-[-8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-mind/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[24rem] w-[30rem] rounded-full bg-pulse/10 blur-[140px]" />
        <div className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-10 pt-32 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-0 lg:pb-24 lg:pt-28">
        {/* copy */}
        <div className="relative z-10 max-w-2xl">
          <p
            className="inline-flex animate-hero-rise items-center gap-2 rounded-full border border-pulse/30 bg-pulse/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-pulse"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-pulse" />
            Classes 8–12 · Boards · JEE · NEET
          </p>
          <h1
            className="mt-6 animate-hero-rise font-display text-[clamp(2.9rem,7.5vw,6.5rem)] font-bold leading-[0.98] tracking-tight"
            style={{ animationDelay: "120ms" }}
          >
            Learn smarter,
            <br />
            <span className="serif-accent text-gradient-brand pr-2">score higher.</span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-hero-rise text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Personalised coaching for Classes 8–12 with a focus on conceptual clarity,
            regular practice, and exam-ready preparation. Small batches, big results.
          </p>
          <div
            className="mt-8 flex animate-hero-rise flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <MagneticButton href="/contact">
              Book a Free Demo
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="/programs" variant="ghost">
              Explore Programs
            </MagneticButton>
          </div>
          <p
            className="mt-6 flex animate-hero-rise items-center gap-2 text-sm text-faint"
            style={{ animationDelay: "480ms" }}
          >
            <span className="inline-flex -space-x-2">
              {["PS", "AM", "SR"].map((t, i) => (
                <span
                  key={t}
                  className="grid h-7 w-7 place-items-center rounded-full border border-abyss font-display text-[9px] font-bold text-white"
                  style={{
                    background: ["#2f6bff", "#8b5cf6", "#b6f34a"][i],
                    color: i === 2 ? "#04070f" : "#fff",
                    zIndex: 3 - i,
                  }}
                >
                  {t}
                </span>
              ))}
            </span>
            Small batches · Max 15 students
          </p>
        </div>

        {/* 3D centerpiece */}
        <div className="relative z-10 h-[340px] sm:h-[440px] lg:h-[620px]">
          <div ref={visualRef} className="absolute inset-0 will-change-transform">
            <HeroCanvas />
          </div>
          {/* floating glass chips tethered to the scene */}
          <div className="glass absolute left-2 top-6 hidden animate-float-y rounded-2xl px-4 py-3 sm:block">
            <p className="font-display text-2xl font-bold text-signal">95%</p>
            <p className="text-[11px] tracking-wide text-muted">board pass rate</p>
          </div>
          <div
            className="glass absolute bottom-10 right-2 hidden animate-float-y rounded-2xl px-4 py-3 sm:block"
            style={{ animationDelay: "-3.5s" }}
          >
            <p className="font-display text-2xl font-bold text-pulse">15 max</p>
            <p className="text-[11px] tracking-wide text-muted">students per batch</p>
          </div>
        </div>
      </div>

      {/* hero stats strip */}
      <div className="relative z-10 border-t border-white/10 bg-navy/60 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-5 sm:px-8 lg:grid-cols-4 lg:divide-x">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col px-2 py-5 lg:px-8 lg:py-6">
              <dd className="font-display text-3xl font-bold tabular-nums text-white lg:text-4xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-1 text-xs tracking-[0.18em] text-faint uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-abyss to-transparent" />
    </section>
  );
}
