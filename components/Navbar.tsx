"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { CONTACT } from "@/lib/theme";
import { ArrowRightIcon, PhoneIcon } from "./icons";
import { cn } from "@/lib/utils";

/** Lightweight premium nav — blur/shift on scroll, elegant mobile menu. */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-abyss/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* institute utility strip — real contact facts, folds away on scroll */}
        <div
          className={cn(
            "hidden overflow-hidden border-white/10 transition-all duration-500 md:block",
            scrolled ? "max-h-0 opacity-0" : "max-h-10 border-b opacity-100"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs text-faint sm:px-8">
            <p className="flex items-center gap-4">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <PhoneIcon className="text-[13px]" /> {CONTACT.phoneDisplay}
              </a>
              <span className="hidden lg:inline">Mon – Sat · 8:00 AM – 8:00 PM</span>
            </p>
            <Link
              href="/contact"
              className="group flex items-center gap-1.5 font-semibold text-muted transition-colors hover:text-pulse"
            >
              Book a free demo — no fees, no pressure
              <ArrowRightIcon className="text-[13px] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand via-brand-deep to-mind font-display text-sm font-bold text-white shadow-[0_8px_24px_-6px_rgba(47,107,255,0.8)] transition-transform duration-300 group-hover:scale-105">
              EA
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold tracking-wide text-ink">
                Excel Academy
              </span>
              <span className="block text-[11px] tracking-[0.22em] text-faint uppercase">
                Classes 8–12
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-active={active}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-link font-display text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors",
                      active ? "text-white" : "text-muted hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="font-display text-[13px] font-semibold tracking-[0.14em] text-muted uppercase transition-colors hover:text-pulse"
            >
              Student Login
            </Link>
            <Link
              href="/contact"
              className="btn-sheen rounded-full bg-brand px-5 py-2.5 font-display text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-[#4a82ff]"
            >
              Book a Demo
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[2px] w-full bg-white transition-all duration-300",
                  open && "top-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-[2px] w-full bg-white transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] w-full bg-white transition-all duration-300",
                  open && "bottom-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-abyss/95 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8 pt-16">
          {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                className={cn(
                  "border-b border-white/10 py-4 font-display text-3xl font-bold transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  active ? "text-gradient-brand" : "text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className={cn(
              "mt-8 flex gap-3 transition-all delay-500 duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <Link
              href="/login"
              className="flex-1 rounded-full border border-white/20 py-3.5 text-center font-display text-sm font-bold"
            >
              Student Login
            </Link>
            <Link
              href="/contact"
              className="flex-1 rounded-full bg-brand py-3.5 text-center font-display text-sm font-bold text-white"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
