"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "signal";
  className?: string;
  onMouseEnter?: () => void;
}

/**
 * Premium CTA: one flat, confident color (never gradient soup), a whisper
 * of sheen on hover, and a gentle magnetic pull toward the cursor on
 * fine pointers only.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const handleMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `translate(${x * 6}px, ${y * 4}px)`;
  };
  const reset = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <Link
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "btn-sheen inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5",
        "font-display text-sm font-semibold tracking-wide transition-all duration-300",
        variant === "primary" &&
          "bg-brand text-white shadow-[0_12px_32px_-12px_rgba(47,91,245,0.9)] hover:bg-[#2650DE] hover:shadow-[0_16px_40px_-12px_rgba(47,91,245,0.9)]",
        variant === "ghost" &&
          "border border-white/20 bg-white/5 text-ink backdrop-blur hover:border-pulse/60 hover:text-white",
        variant === "signal" &&
          "bg-signal text-abyss shadow-[0_12px_40px_-10px_rgba(182,243,74,0.5)] hover:brightness-110",
        className
      )}
    >
      {children}
    </Link>
  );
}
