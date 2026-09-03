"use client";

import dynamic from "next/dynamic";
import SceneGate from "./SceneFallback";

const ConstellationField = dynamic(() => import("./ConstellationField"), {
  ssr: false,
});

/** Client boundary for the programs-page constellation. */
export default function ConstellationCanvas() {
  return (
    <SceneGate
      label="3D constellation of five glowing spheres ascending from Class 8 to Class 12"
      fallbackVariant="field"
      className="h-[300px] w-full sm:h-[380px]"
    >
      <ConstellationField />
    </SceneGate>
  );
}
