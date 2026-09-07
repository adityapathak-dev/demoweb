"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FRAMES, NAV_LINKS, SHAPES, SHOP_CATEGORIES, STORE, inr } from "@/lib/spec";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8h15l-1.2 12H7.2L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.2-3.2 3.9-5 7-5s5.8 1.8 7 5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export default function SpecNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, setOpen: setBagOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [account, setAccount] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setAccount(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menus on navigation — event-driven (link clicks) to respect
  // the repo's no-setState-in-effect rule; see onClick closers below.

  const results =
    query.trim().length < 2
      ? []
      : FRAMES.filter((f) =>
          `${f.name} ${f.shape} ${f.material} ${f.sku}`.toLowerCase().includes(query.trim().toLowerCase())
        ).slice(0, 6);

  function openMega() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(true);
  }
  function scheduleCloseMega() {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 140);
  }

  const searchBox = (id: string) => (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search frames
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-smoke" aria-hidden>
        <SearchIcon />
      </span>
      <input
        id={id}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
        placeholder="Search frames, shapes…"
        autoComplete="off"
        className="w-full rounded-lg border border-border bg-sand py-2 pl-10 pr-3 text-sm text-ink placeholder:text-disabled"
      />
      {searchFocus && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)]" role="listbox" aria-label="Frame matches">
          {results.map((f) => (
            <li key={f.sku}>
              <Link
                href={`/book?frame=${f.sku}`}
                className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-sand"
                onClick={() => {
                  setQuery("");
                  setMobileSearch(false);
                }}
              >
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-sand">
                  <Image src={f.photo} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-heading">{f.name}</span>
                  <span className="block text-xs text-smoke">
                    {f.shape} · {inr(f.price)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className="border-t border-border">
            <Link
              href="/collections"
              className="block px-3 py-2.5 text-center text-[13px] font-medium text-ink hover:bg-sand"
              onClick={() => {
                setQuery("");
                setMobileSearch(false);
              }}
            >
              See all frames →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200",
          scrolled ? "border-b border-border shadow-[0_2px_16px_rgba(0,0,0,0.06)]" : "border-b border-transparent"
        )}
      >
        <div className={cn("overflow-hidden bg-sand text-ink transition-all duration-300", scrolled ? "max-h-0" : "max-h-10")}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:px-8">
            <p className="truncate text-smoke">Festive offer: flat 40% off frames + free eye test — valid till Tuesday</p>
            <span className="hidden shrink-0 items-center gap-4 sm:flex">
              <Link href="/track-order" className="font-medium text-smoke transition-colors hover:text-heading">
                Track order
              </Link>
              <Link href="/stores" className="font-medium text-smoke transition-colors hover:text-heading">
                Stores
              </Link>
              <a href={STORE.phoneHref} className="font-medium text-ink underline underline-offset-2 hover:text-smoke">
                {STORE.phoneDisplay}
              </a>
            </span>
          </div>
        </div>

        <nav aria-label="Primary" className="relative mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="SPEC home">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-sm font-semibold text-white">SP</span>
            <span className="leading-none">
              <span className="block text-base font-semibold tracking-tight text-heading">SPEC</span>
              <span className="block text-[10px] uppercase text-smoke">Optical Studio</span>
            </span>
          </Link>

          <ul className="ml-2 hidden items-center gap-6 lg:flex">
            <li onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
              <Link
                href="/collections"
                aria-expanded={mega}
                aria-haspopup="true"
                onFocus={openMega}
                onClick={() => setMega(false)}
                data-active={pathname === "/collections"}
                className={cn("nav-link text-[13px] font-medium", pathname === "/collections" ? "text-heading" : "text-smoke hover:text-heading")}
              >
                Frames
              </Link>
            </li>
            {NAV_LINKS.filter((l) => l.href !== "/collections").map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={active}
                    onClick={() => setMega(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn("nav-link text-[13px] font-medium", active ? "text-heading" : "text-smoke hover:text-heading")}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto hidden min-w-0 flex-1 max-w-xs xl:block">{searchBox("site-search")}</div>

          <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
            <button
              type="button"
              onClick={() => setMobileSearch((v) => !v)}
              aria-expanded={mobileSearch}
              aria-label="Search frames"
              className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sand xl:hidden"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={() => setAccount(true)}
              aria-label="Account — coming soon"
              className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sand"
            >
              <UserIcon />
            </button>
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              aria-label={count > 0 ? `Open bag, ${count} items` : "Open bag"}
              className="relative grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sand"
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-semibold text-white" aria-hidden>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <Link
              href="/book"
              className="ml-1 hidden rounded-lg bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-ink sm:block"
            >
              Book eye test
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden>
                <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-heading transition-all duration-200", open && "top-[7px] rotate-45")} />
                <span className={cn("absolute left-0 top-[7px] h-[1.5px] w-full bg-heading transition-all duration-200", open && "opacity-0")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-heading transition-all duration-200", open && "bottom-[7px] -rotate-45")} />
              </span>
            </button>
          </div>

          {/* Mega menu — sub-styles + thumbnails, desktop only */}
          <div
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
            className={cn(
              "absolute inset-x-5 top-full hidden transition-all duration-200 lg:block xl:inset-x-8",
              mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
            )}
          >
            <div className="grid grid-cols-[220px_1fr] gap-8 rounded-xl border border-border bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
              <div>
                <p className="text-[11px] font-medium uppercase text-smoke">Shop by shape</p>
                <ul className="mt-3 space-y-1">
                  {SHAPES.filter((s) => s !== "All").map((s) => {
                    const n = FRAMES.filter((f) => f.shape === s).length;
                    return (
                      <li key={s}>
                        <Link href="/collections" onClick={() => setMega(false)} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-sand">
                          {s}
                          <span className="text-xs text-smoke">{n > 0 ? `${n} online` : "in store"}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setMega(false);
                    router.push("/collections");
                  }}
                  className="mt-3 text-[13px] font-medium text-ink underline underline-offset-2 hover:text-smoke"
                >
                  All 120+ in store →
                </button>
              </div>
              <ul className="grid grid-cols-3 gap-4">
                {SHOP_CATEGORIES.slice(0, 3).map((c) => (
                  <li key={c.label}>
                    <Link href={c.href} onClick={() => setMega(false)} className="group block overflow-hidden rounded-xl">
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                        <Image src={c.photo} alt={c.photoAlt} fill sizes="240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </span>
                      <span className="mt-2 block text-sm font-medium text-heading">
                        {c.label} <span aria-hidden className="text-smoke">→</span>
                      </span>
                      <span className="block text-xs text-smoke">{c.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {mobileSearch && <div className="border-t border-border px-5 py-2.5 sm:px-8 xl:hidden">{searchBox("site-search-m")}</div>}
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-40 bg-white transition-all lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")}>
        <div className="flex h-full flex-col justify-center gap-1 px-8 pt-20">
          {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l, i) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
              className={cn("border-b border-border py-3 text-3xl font-medium transition-all duration-300", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex gap-2">
            <Link href="/book" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-border py-3 text-center text-sm font-medium transition-colors hover:bg-sand">
              Free eye test
            </Link>
            <a href={STORE.phoneHref} className="flex-1 rounded-lg bg-black py-3 text-center text-sm font-medium text-white transition-colors hover:bg-ink">
              Call store
            </a>
          </div>
          <p className="mt-4 text-xs text-smoke">
            {STORE.hoursLines[0]} · {STORE.addressLines[1]}
          </p>
        </div>
      </div>

      {/* Account placeholder — honest until real auth ships */}
      {account && (
        <div role="dialog" aria-modal="true" aria-label="Account" className="fixed inset-0 z-[85] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setAccount(false)}>
          <div aria-hidden className="absolute inset-0 bg-heading/40" />
          <div className="card relative w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-heading">Accounts are coming soon</h2>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              Prescriptions, wishlist and orders will live here. Until then, the store keeps everything on your phone number — nothing to remember.
            </p>
            <div className="mt-4 flex gap-2">
              <a href={STORE.whatsapp} target="_blank" rel="noreferrer" className="flex-1 rounded-lg bg-black px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-ink">
                WhatsApp the store
              </a>
              <button type="button" onClick={() => setAccount(false)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-sand">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
