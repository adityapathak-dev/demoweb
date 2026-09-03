"use client";

import { Component, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion, useWebGLAvailable } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SceneErrorBoundary — any WebGL crash degrades to the CSS fallback  */
/* ------------------------------------------------------------------ */
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.setState({ failed: true });
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  SceneFallback — beautiful pure-CSS 2D stand-in (no WebGL needed)   */
/* ------------------------------------------------------------------ */
export function SceneFallback({ variant = "hero", className }: { variant?: "hero" | "orbit" | "field"; className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {variant === "hero" && (
        <>
          <div className="fallback-orb left-[8%] top-[12%] h-72 w-72 bg-brand/50" />
          <div
            className="fallback-orb right-[6%] top-[30%] h-96 w-96 bg-mind/40"
            style={{ animationDelay: "-4s" }}
          />
          <div
            className="fallback-orb bottom-[8%] left-[35%] h-64 w-64 bg-pulse/30"
            style={{ animationDelay: "-8s" }}
          />
          <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pulse/20" />
          <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/25" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand via-mind to-pulse opacity-70 blur-2xl" />
        </>
      )}
      {variant === "orbit" && (
        <>
          <div className="fallback-orb left-[20%] top-[20%] h-56 w-56 bg-mind/40" />
          <div
            className="fallback-orb right-[15%] bottom-[15%] h-72 w-72 bg-brand/40"
            style={{ animationDelay: "-6s" }}
          />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-pulse/25" />
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/30" />
        </>
      )}
      {variant === "field" && (
        <>
          <div className="fallback-orb left-[10%] top-[10%] h-60 w-60 bg-pulse/30" />
          <div
            className="fallback-orb right-[20%] top-[40%] h-52 w-52 bg-magenta/30"
            style={{ animationDelay: "-3s" }}
          />
          <div
            className="fallback-orb bottom-[10%] left-[45%] h-64 w-64 bg-brand/40"
            style={{ animationDelay: "-7s" }}
          />
        </>
      )}
      <div className="dot-grid absolute inset-0 opacity-40" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SceneGate — mounts the R3F canvas only when it is safe & visible:  */
/*  WebGL available, no reduced-motion preference, in viewport.        */
/*  Otherwise the CSS fallback carries the composition.                */
/* ------------------------------------------------------------------ */
export default function SceneGate({
  children,
  fallbackVariant = "hero",
  className,
  label,
}: {
  children: ReactNode;
  fallbackVariant?: "hero" | "orbit" | "field";
  className?: string;
  label: string;
}) {
  const webgl = useWebGLAvailable();
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.05, false);
  const canRender = webgl === true && !reduced && inView;

  return (
    <div ref={ref} className={cn("relative", className)} role="img" aria-label={label}>
      <SceneFallback variant={fallbackVariant} />
      {canRender && (
        <SceneErrorBoundary fallback={null}>
          <div className="absolute inset-0">{children}</div>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
