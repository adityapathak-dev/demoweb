"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SUBJECT_COLORS } from "@/lib/theme";
import { mulberry32 } from "@/lib/utils";

/**
 * HeroScene — the visual identity of Excel Academy.
 * A "knowledge core" (layered icosahedron: glass shell, wireframe mind,
 * glowing heart) orbited by six subject orbs, gyroscopic rings and dust.
 * Gently cursor-reactive, slow idle motion, real multi-source lighting.
 */

const ORBIT_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
] as const;

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      t * 0.06 + px * 0.28,
      2.2,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -py * 0.18 + Math.sin(t * 0.2) * 0.03,
      2.2,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

function Core() {
  const shell = useRef<THREE.Mesh>(null!);
  const mind = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    shell.current.rotation.y += delta * 0.12;
    shell.current.rotation.z += delta * 0.04;
    mind.current.rotation.y -= delta * 0.18;
    mind.current.rotation.x += delta * 0.07;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      {/* glass shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshPhysicalMaterial
          color="#0e1c44"
          metalness={0.35}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.15}
          emissive="#2f6bff"
          emissiveIntensity={0.28}
        />
      </mesh>
      {/* wireframe mind */}
      <mesh ref={mind} scale={1.02}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial color="#3ee2ff" wireframe transparent opacity={0.28} />
      </mesh>
      {/* glowing heart */}
      <mesh>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial color="#9beaff" transparent opacity={0.95} />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial
          color="#2f6bff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function GyroRings() {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    a.current.rotation.z += delta * 0.15;
    b.current.rotation.z -= delta * 0.1;
  });
  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.35, 0.25, 0]}>
        <torusGeometry args={[2.35, 0.014, 16, 160]} />
        <meshBasicMaterial color="#3ee2ff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.35, 0.4]}>
        <torusGeometry args={[2.75, 0.011, 16, 160]} />
        <meshBasicMaterial color="#f064c8" transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, 0, -0.5]}>
        <torusGeometry args={[3.1, 0.008, 12, 160]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SubjectOrbs() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.16;
    group.current.children.forEach((orb, i) => {
      const angle = t + (i / ORBIT_SUBJECTS.length) * Math.PI * 2;
      const r = 3.15 + Math.sin(t * 2 + i) * 0.08;
      orb.position.set(Math.cos(angle) * r, Math.sin(angle * 1.3 + i) * 0.9, Math.sin(angle) * r * 0.55);
    });
  });
  return (
    <group ref={group}>
      {ORBIT_SUBJECTS.map((subject, i) => {
        const color = SUBJECT_COLORS[subject] ?? "#3ee2ff";
        const angle = (i / ORBIT_SUBJECTS.length) * Math.PI * 2;
        return (
          <group key={subject} position={[Math.cos(angle) * 3.15, 0, Math.sin(angle) * 1.7]}>
            <Float speed={2.2} rotationIntensity={0} floatIntensity={1.4}>
              <mesh>
                <sphereGeometry args={[0.16, 24, 24]} />
                <meshStandardMaterial color="#0a1122" emissive={color} emissiveIntensity={2.4} roughness={0.3} />
              </mesh>
              <mesh scale={2.1}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={0.22}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 420;
    const rand = mulberry32(20240904);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 4.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.z += delta * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#7aa5ff"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={60} distance={24} color="#3ee2ff" />
      <pointLight position={[5, 3, -2]} intensity={50} distance={24} color="#f064c8" />
      <pointLight position={[0, 5, 4]} intensity={30} distance={22} color="#2f6bff" />
      <Rig>
        <Core />
        <GyroRings />
        <SubjectOrbs />
        <Dust />
      </Rig>
      <Sparkles count={80} scale={[11, 7, 7]} size={3} speed={0.35} color="#3ee2ff" opacity={0.55} />
      <Sparkles count={36} scale={[9, 6, 6]} size={4} speed={0.25} color="#f064c8" opacity={0.4} />
    </Canvas>
  );
}
