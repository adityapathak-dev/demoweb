"use client";

import Link from "next/link";
import { useState } from "react";
import { inr, type Frame } from "@/lib/spec";
import { useCart } from "@/lib/cart";

const LENSES = [
  { id: "std", label: "Standard single-vision", add: 0, note: "Included" },
  { id: "blue", label: "Blue-cut", add: 600, note: "+₹600" },
  { id: "photo", label: "Photochromic", add: 1200, note: "+₹1,200" },
  { id: "hi", label: "1.67 high-index", add: 1800, note: "+₹1,800" },
] as const;

/** Lens picker + add-to-bag for the product detail page. */
export default function BuyBox({ frame }: { frame: Frame }) {
  const { add } = useCart();
  const [lens, setLens] = useState<(typeof LENSES)[number]["id"]>("std");
  const [added, setAdded] = useState(false);
  const chosen = LENSES.find((l) => l.id === lens)!;
  const total = frame.price + chosen.add;

  return (
    <div>
      <p className="text-lg font-semibold text-heading">
        {inr(total)}{" "}
        <s className="ml-1 text-sm font-normal text-disabled">{inr(frame.mrp + chosen.add)}</s>
      </p>
      <p className="mt-1 text-sm text-smoke">Incl. lenses + fitting · GST bill · 1-year warranty</p>

      <fieldset className="mt-5">
        <legend className="text-xs font-medium uppercase text-smoke">Lens — quoted before cutting</legend>
        <div className="mt-2 grid gap-2">
          {LENSES.map((l) => (
            <label
              key={l.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                lens === l.id ? "border-gold bg-white" : "border-border bg-white hover:bg-sand"
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`lens-${frame.sku}`}
                  checked={lens === l.id}
                  onChange={() => setLens(l.id)}
                  className="accent-[#8A6C3E]"
                />
                <span className="text-ink">{l.label}</span>
              </span>
              <span className="text-xs text-smoke">{l.note}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            add({ sku: frame.sku, name: frame.name, photo: frame.photo, unit: total, meta: chosen.label });
            setAdded(true);
            setTimeout(() => setAdded(false), 2200);
          }}
          className="flex-1 rounded-lg bg-heading px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-ink"
          role="status"
        >
          {added ? "✓ In your bag" : `Add to bag · ${inr(total)}`}
        </button>
        <Link
          href={`/book?frame=${frame.sku}`}
          className="flex-1 rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-heading transition-colors hover:bg-golddeep hover:text-white"
        >
          Try at home — free
        </Link>
      </div>
      <p className="mt-3 text-xs text-smoke">Bag reserves at the store — pay when you collect. No advance, ever.</p>
    </div>
  );
}
