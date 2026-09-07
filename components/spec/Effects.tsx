"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * SpecEffects — additive-only motion layer.
 * No content, copy, layout, color, or branding changes.
 * Adds: scroll progress hairline, back-to-top, gentle parallax,
 * magnetic CTA nudge, and button sheen. All respect reduced-motion.
 */
export default function SpecEffects() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const [showTop, setShowTop] = useState(false);

  // Re-trigger reveals on route change (App Router client navigation).
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => {
      if (!e.classList.contains("is-visible")) io.observe(e);
    });
    return () => io.disconnect();
  }, [pathname]);

  // Scroll progress + back-to-top visibility + subtle hero parallax.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${p})`;
        }
        setShowTop(window.scrollY > 900);
        // Gentle parallax: drift [data-parallax] layers at most 24px.
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax || 0.08);
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          const shift = Math.max(-24, Math.min(24, -center * speed));
          el.style.translate = `0 ${shift.toFixed(1)}px`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Magnetic nudge for primary CTAs on fine pointers only.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
        "a.rounded-lg.bg-heading, button.rounded-lg.bg-heading"
      )
    );
    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${(x * 5).toFixed(1)}px, ${(y * 3).toFixed(1)}px)`;
    };
    const onLeave = (e: Event) => {
      (e.currentTarget as HTMLElement).style.transform = "";
    };
    els.forEach((el) => {
      el.classList.add("btn-magnetic");
      el.addEventListener("pointermove", onMove as EventListener);
      el.addEventListener("pointerleave", onLeave);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("pointermove", onMove as EventListener);
        el.removeEventListener("pointerleave", onLeave);
        el.style.transform = "";
      });
    };
  }, [pathname]);

  return (
    <>
      {/* Scroll progress hairline — ink on transparent, no layout shift */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-heading"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Back to top — appears after deep scroll */}
      <button
        ref={topRef}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-20 right-5 z-[75] grid h-11 w-11 place-items-center rounded-lg border border-border bg-white text-base text-heading shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-sand ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span aria-hidden>↑</span>
      </button>
    </>
  );
}
