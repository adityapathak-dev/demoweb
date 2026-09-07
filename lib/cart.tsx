"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  sku: string;
  name: string;
  photo: string;
  unit: number;
  meta: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (sku: string, meta?: string) => void;
  setQty: (sku: string, meta: string | undefined, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "spec-bag";

function load(): CartItem[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(list) ? list.filter((i) => i && i.sku && i.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Lazy initializer reads localStorage once (same pattern as the wishlist).
  // Guarded for SSR; no setState-in-effect needed.
  const [items, setItems] = useState<CartItem[]>(() => load());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* offline-safe: ignore quota errors */
    }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const at = prev.findIndex((p) => p.sku === item.sku && p.meta === item.meta);
      if (at >= 0) {
        const next = [...prev];
        next[at] = { ...next[at], qty: Math.min(9, next[at].qty + qty) };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((sku: string, meta?: string) => {
    setItems((prev) => prev.filter((p) => !(p.sku === sku && (meta === undefined || p.meta === meta))));
  }, []);

  const setQty = useCallback((sku: string, meta: string | undefined, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => !(p.sku === sku && p.meta === meta))
        : prev.map((p) => (p.sku === sku && p.meta === meta ? { ...p, qty: Math.min(9, qty) } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, total } = useMemo(() => {
    return {
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.unit, 0),
    };
  }, [items]);

  const value = useMemo(
    () => ({ items, count, total, open, setOpen, add, remove, setQty, clear }),
    [items, count, total, open, add, remove, setQty, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
