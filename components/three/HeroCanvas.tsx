"use client";

import dynamic from "next/dynamic";
import SceneGate from "./SceneFallback";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Client boundary for the hero centerpiece (dynamic import needs one). */
export default function HeroCanvas() {
  return (
    <SceneGate
      label="Interactive 3D visualization of a glowing knowledge core orbited by six subject orbs"
      className="h-full w-full"
    >
      <HeroScene />
    </SceneGate>
  );
}
