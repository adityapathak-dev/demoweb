"use client";

import dynamic from "next/dynamic";
import SceneGate from "./SceneFallback";

const MethodOrbit = dynamic(() => import("./MethodOrbit"), { ssr: false });

/** Client boundary for the method-section 3D mechanism. */
export default function MethodCanvas() {
  return (
    <SceneGate
      label="3D visualization of the four-step learning cycle orbiting a central core"
      fallbackVariant="orbit"
      className="h-[380px] w-full sm:h-[480px]"
    >
      <MethodOrbit />
    </SceneGate>
  );
}
