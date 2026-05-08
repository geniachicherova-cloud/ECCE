"use client";

import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LngLat = [number, number];

const RADIUS = 1.6;

function lngLatToVec3(lng: number, lat: number, radius = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeMesh({ coordinates, paused }: { coordinates: LngLat[]; paused: boolean }): ReactNode {
  const groupRef = useRef<THREE.Group>(null);

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(RADIUS, 48, 36), []);
  const wireframeGeometry = useMemo(() => new THREE.SphereGeometry(RADIUS * 1.001, 24, 18), []);
  const markerGeometry = useMemo(() => new THREE.SphereGeometry(0.018, 8, 8), []);

  const markerPositions = useMemo(
    () => coordinates.map(([lng, lat]) => lngLatToVec3(lng, lat, RADIUS * 1.005)),
    [coordinates],
  );

  useFrame((_, delta) => {
    if (paused) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={sphereGeometry}>
        <meshBasicMaterial color="#0F1B2D" transparent opacity={0.92} />
      </mesh>
      <lineSegments>
        <wireframeGeometry args={[wireframeGeometry]} />
        <lineBasicMaterial color="#3FE0C5" transparent opacity={0.18} />
      </lineSegments>
      {markerPositions.map((pos, i) => (
        <mesh geometry={markerGeometry} key={i} position={pos}>
          <meshBasicMaterial color="#3FE0C5" />
        </mesh>
      ))}
    </group>
  );
}

export function HeroGlobe({
  coordinates,
  paused = false,
}: {
  coordinates: LngLat[];
  paused?: boolean;
}): ReactNode {
  return (
    <Canvas
      aria-hidden
      camera={{ position: [0, 0.4, 4.4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight intensity={0.8} position={[2, 3, 4]} />
      <GlobeMesh coordinates={coordinates} paused={paused} />
    </Canvas>
  );
}

export default HeroGlobe;
