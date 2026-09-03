"use client";

import { useScrollProgress } from "@/lib/hooks";

/** 2px gradient progress hairline pinned to the top of the viewport. */
export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand via-pulse to-mind"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
