"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** IntersectionObserver-driven scroll reveals (.reveal → .is-visible).
 *  Additive hardening only: re-runs on route change + observes late nodes.
 *  No visual or content changes — timing stays in globals.css. */
export default function SpecReveal() {
  const pathname = usePathname();

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
    const reveal = (el: Element) => {
      if (el.classList.contains("is-visible")) return;
      io.observe(el);
    };
    els.forEach(reveal);
    // Catch nodes added after mount (chat open, form success, etc.)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.classList?.contains("reveal")) reveal(n);
          n.querySelectorAll?.(".reveal").forEach(reveal);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}
