"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/spec";
import { cn } from "@/lib/utils";

/** Slide-over bag — reserves frames at the store (demo checkout → booking). */
export default function CartDrawer() {
  const { items, total, count, open, setOpen, setQty, remove, clear } = useCart();

  return (
    <div className={cn("fixed inset-0 z-[85]", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div
        className={cn("absolute inset-0 bg-heading/40 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={count > 0 ? `Shopping bag, ${count} items` : "Shopping bag"}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-[0_16px_48px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-base font-semibold text-heading">
            Your bag {count > 0 && <span className="ml-1 text-sm font-normal text-smoke">· {count} item{count > 1 ? "s" : ""}</span>}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink hover:bg-sand"
          >
            <span aria-hidden>✕</span>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <p className="text-lg font-medium text-heading">Nothing reserved yet</p>
              <p className="mt-1 text-sm text-smoke">Save a frame here, then try it at home or in-store — no payment online.</p>
              <Link
                href="/collections"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-ink"
              >
                Browse frames
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((i) => (
                <li key={`${i.sku}-${i.meta}`} className="flex gap-3 rounded-xl bg-sand/60 p-3">
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                    <Image src={i.photo} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-heading">{i.name}</p>
                    <p className="truncate text-xs text-smoke">
                      {i.sku} · {i.meta}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-1.5 py-1">
                        <button type="button" onClick={() => setQty(i.sku, i.meta, i.qty - 1)} aria-label={`Remove one ${i.name}`} className="grid h-6 w-6 place-items-center rounded-md text-ink hover:bg-sand">
                          −
                        </button>
                        <span className="min-w-4 text-center text-sm font-medium text-heading" aria-live="polite">
                          {i.qty}
                        </span>
                        <button type="button" onClick={() => setQty(i.sku, i.meta, i.qty + 1)} aria-label={`Add one ${i.name}`} className="grid h-6 w-6 place-items-center rounded-md text-ink hover:bg-sand">
                          +
                        </button>
                      </span>
                      <p className="text-sm font-semibold text-heading">{inr(i.unit * i.qty)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => remove(i.sku, i.meta)} aria-label={`Remove ${i.name} from bag`} className="self-start rounded-md px-1 text-sm text-smoke hover:text-heading">
                    <span aria-hidden>✕</span>
                  </button>
                </li>
              ))}
            </ul>
            <footer className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <p className="text-smoke">Subtotal (lenses included)</p>
                <p className="text-lg font-semibold text-heading">{inr(total)}</p>
              </div>
              <p className="mt-1 text-xs text-smoke">Pay at the store after your eye test — this only reserves the frames.</p>
              <div className="mt-3 flex gap-2">
                <Link href="/book" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white hover:bg-ink">
                  Reserve at store →
                </Link>
                <button type="button" onClick={clear} className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-ink hover:bg-sand">
                  Clear
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
