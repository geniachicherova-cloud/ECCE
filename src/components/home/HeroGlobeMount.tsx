"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const HeroGlobe = dynamic(() => import("./HeroGlobe").then((m) => m.HeroGlobe), {
  ssr: false,
  loading: () => null,
});

type LngLat = [number, number];

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export function HeroGlobeMount({ coordinates }: { coordinates: LngLat[] }): ReactNode {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const onChange = (event: MediaQueryListEvent): void => setReducedMotion(event.matches);
    motionQuery.addEventListener("change", onChange);

    const supportsWebGL = detectWebGL();
    setWebglAvailable(supportsWebGL);

    if (!supportsWebGL) {
      return () => motionQuery.removeEventListener("change", onChange);
    }

    const idleApi = (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    });

    let cleanupTimer: () => void;
    if (typeof idleApi.requestIdleCallback === "function") {
      const handle = idleApi.requestIdleCallback(() => setMounted(true), { timeout: 1500 });
      cleanupTimer = () => idleApi.cancelIdleCallback?.(handle);
    } else {
      const handle = window.setTimeout(() => setMounted(true), 800);
      cleanupTimer = () => window.clearTimeout(handle);
    }

    return () => {
      motionQuery.removeEventListener("change", onChange);
      cleanupTimer();
    };
  }, []);

  if (!webglAvailable || !mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <HeroGlobe coordinates={coordinates} paused={reducedMotion} />
    </div>
  );
}
