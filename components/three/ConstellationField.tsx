"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { CLASS_COLORS } from "@/lib/theme";
import { mulberry32 } from "@/lib/utils";

/**
 * ConstellationField — the five classes as an ascending constellation.
 * Spheres grow from Class 8 to Class 12: the learner's journey rendered
 * as rising bodies of light.
 */

const CLASSES = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] as const;

function Journey() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.08) * 0.25;
    group.current.position.y = Math.sin(t * 0.35) * 0.08;
  });
  return (
    <group ref={group}>
      {CLASSES.map((cls, i) => {
        const x = (i - 2) * 1.9;
        const y = (i - 2) * 0.42;
        const size = 0.28 + i * 0.11;
        const color = CLASS_COLORS[cls] ?? "#3ee2ff";
        return (
          <group key={cls} position={[x, y, Math.sin(i * 1.7) * 0.8]}>
            <Float speed={1.8 + i * 0.15} rotationIntensity={0} floatIntensity={1.6}>
              <mesh>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                  color="#0a1122"
                  emissive={color}
                  emissiveIntensity={1.6}
                  roughness={0.25}
                  metalness={0.3}
                />
              </mesh>
              <mesh scale={1.5}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={0.16}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </Float>
            {i < CLASSES.length - 1 && (
              <mesh position={[0.95, 0.21, 0]} rotation={[0, 0, 0.42]}>
                <cylinderGeometry args={[0.008, 0.008, 1.7, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.35} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function Motes() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 220;
    const rand = mulberry32(77012);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 14;
      arr[i * 3 + 1] = (rand() - 0.5) * 7;
      arr[i * 3 + 2] = (rand() - 0.5) * 6 - 1;
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.008;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8ea6ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ConstellationField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 9.5], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <pointLight position={[-5, 2, 3]} intensity={50} distance={24} color="#3ee2ff" />
      <pointLight position={[5, -1, 2]} intensity={40} distance={24} color="#f064c8" />
      <Journey />
      <Motes />
    </Canvas>
  );
}
