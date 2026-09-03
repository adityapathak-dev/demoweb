"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * MethodOrbit — the 4-step learning cycle as a living mechanism.
 * A violet "intelligence" octahedron at the centre, four method nodes
 * in a slow gyroscopic orbit, linked by a hairline ring.
 */

const NODE_COLORS = ["#2f6bff", "#3ee2ff", "#b6f34a", "#ff7a59"];

function Centre() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.7}>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#151031"
          emissive="#8b5cf6"
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      <mesh scale={1.25}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

function Nodes() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.28;
    group.current.children.forEach((node, i) => {
      const angle = t + (i / 4) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.2, Math.sin(angle * 2 + i) * 0.35, Math.sin(angle) * 2.2);
    });
  });
  return (
    <group ref={group} rotation={[0.35, 0, -0.12]}>
      {NODE_COLORS.map((color, i) => (
        <Float key={color} speed={2} rotationIntensity={0} floatIntensity={1.2}>
          <mesh>
            <sphereGeometry args={[0.17 - i * 0.008, 24, 24]} />
            <meshStandardMaterial color="#0a1122" emissive={color} emissiveIntensity={2.2} roughness={0.3} />
          </mesh>
          <mesh scale={2}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function MethodOrbit() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.1, 6.4], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <pointLight position={[-4, 1, 3]} intensity={40} distance={20} color="#8b5cf6" />
      <pointLight position={[4, -1, 2]} intensity={30} distance={20} color="#3ee2ff" />
      <Centre />
      <Nodes />
      <mesh rotation={[Math.PI / 2 - 0.35, 0, -0.12]}>
        <torusGeometry args={[2.2, 0.008, 12, 128]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
    </Canvas>
  );
}
