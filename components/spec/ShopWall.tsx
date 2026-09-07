"use client";

import Image from "next/image";
import Link from "next/link";
import { SHOP_CATEGORIES } from "@/lib/spec";

/**
 * Asymmetric category grid: one large featured tile + smaller ones.
 * Cards tilt in 3D perspective on hover (max ~5°); image zooms, CTA fades in.
 */
export default function ShopWall() {
  function onTilt(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${(x * 5).toFixed(2)}deg) rotateX(${(-y * 5).toFixed(2)}deg) translateY(-4px)`;
  }
  function onTiltLeave(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.transform = "";
  }
  return (
    <section id="collections" aria-labelledby="shopwall-h" className="scroll-mt-24 border-t border-border bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-smoke">01 — Shop by need</p>
            <h2 id="shopwall-h" className="mt-2 max-w-xl text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
              Start with your day. We&apos;ll match the lens.
            </h2>
            <p className="mt-2 max-w-lg text-sm text-smoke">
              Screen-heavy, road-heavy, or sun-heavy — every lane lands on frames you can try at home or in-store today.
            </p>
          </div>
          <Link href="/book" className="rounded-lg bg-black px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-ink">
            Try 5 at home — free
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2">
          {SHOP_CATEGORIES.map((c, i) => {
            const featured = i === 0;
            return (
              <li
                key={c.label}
                className={`reveal ${featured ? "col-span-2 row-span-2" : ""}`}
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <Link
                  href={c.href}
                  onMouseMove={onTilt}
                  onMouseLeave={onTiltLeave}
                  className={`card card-lift group relative block overflow-hidden ${featured ? "h-full min-h-[320px] lg:min-h-[420px]" : ""}`}
                  aria-label={`Shop ${c.label} — ${c.blurb}`}
                >
                  <span className={`relative block overflow-hidden ${featured ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[4/3]"}`}>
                    <Image
                      src={c.photo}
                      alt={c.photoAlt}
                      fill
                      sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-white/95 p-4 backdrop-blur-sm">
                    <span>
                      <span className={`block font-semibold text-heading ${featured ? "text-xl" : "text-sm"}`}>{c.label}</span>
                      <span className="mt-0.5 block text-xs text-smoke">{c.blurb}</span>
                    </span>
                    <span className="shrink-0 rounded-lg bg-black px-3.5 py-2 text-xs font-medium text-white opacity-100 transition-all duration-200 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                      Shop →
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
