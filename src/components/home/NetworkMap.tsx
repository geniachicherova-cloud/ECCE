"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import maplibregl from "maplibre-gl";
import Link from "next/link";
import type { Institute } from "@/lib/content/collections";
import type { Region } from "@/lib/content/types";
import { regionLabels } from "@/lib/content/labels";

const REGION_VIEWS: Record<Region, { center: [number, number]; zoom: number }> = {
  europe: { center: [12, 50], zoom: 2.6 },
  africa: { center: [22, 4], zoom: 2.4 },
  asia: { center: [105, 28], zoom: 2.2 },
  "n-america": { center: [-98, 40], zoom: 2.4 },
  "s-america": { center: [-60, -18], zoom: 2.4 },
};

const ROTATION_ORDER: Region[] = ["europe", "n-america", "s-america", "africa", "asia"];
const ROTATION_INTERVAL_MS = 12000;

export function NetworkMap({ institutes }: { institutes: Institute[] }): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const initial = REGION_VIEWS[ROTATION_ORDER[0]];
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "/map/ecce-style.json",
      center: initial.center,
      zoom: initial.zoom,
      attributionControl: false,
      interactive: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      map.addSource("institutes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: institutes.map((institute) => ({
            type: "Feature",
            properties: { slug: institute.slug, name: institute.name, region: institute.region },
            geometry: { type: "Point", coordinates: institute.coordinates },
          })),
        },
      });
      map.addLayer({
        id: "institute-glow",
        source: "institutes",
        type: "circle",
        paint: {
          "circle-radius": 12,
          "circle-color": "#3FE0C5",
          "circle-opacity": 0.18,
        },
      });
      map.addLayer({
        id: "institute-dot",
        source: "institutes",
        type: "circle",
        paint: {
          "circle-radius": 4,
          "circle-color": "#3FE0C5",
          "circle-stroke-color": "#0A0E1A",
          "circle-stroke-width": 1,
        },
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [institutes]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const interval = window.setInterval(() => {
      setActiveRegionIndex((idx) => (idx + 1) % ROTATION_ORDER.length);
    }, ROTATION_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, paused]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const region = ROTATION_ORDER[activeRegionIndex];
    const view = REGION_VIEWS[region];
    map.flyTo({
      center: view.center,
      zoom: view.zoom,
      duration: reducedMotion ? 0 : 2400,
      essential: true,
    });
  }, [activeRegionIndex, reducedMotion]);

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          aria-label="World map showing ECCE partner institutes across five continents, auto-rotating through regions"
          className="min-h-[480px] overflow-hidden rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)]"
          ref={containerRef}
          role="img"
        />
        <div className="pointer-events-none absolute left-6 top-6 rounded-[var(--ecce-radius-md)] bg-[var(--ecce-color-background-overlay)] px-4 py-3 backdrop-blur">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
            Region focus
          </p>
          <p className="mt-1 font-serif text-xl text-[var(--ecce-color-ink-high)]">
            {regionLabels[ROTATION_ORDER[activeRegionIndex]]}
          </p>
        </div>
      </div>

      <details className="mt-4 rounded-[var(--ecce-radius-md)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-4">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
          Browse all {institutes.length} partner institutes
        </summary>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {institutes.map((institute) => (
            <li className="text-sm text-[var(--ecce-color-ink-mid)]" key={institute.slug}>
              <Link
                className="block rounded-[var(--ecce-radius-sm)] px-2 py-2 hover:bg-[var(--ecce-color-background-base)] hover:text-[var(--ecce-color-ink-high)]"
                href={`/partner-institutes/${institute.slug}`}
              >
                <span className="block font-medium text-[var(--ecce-color-ink-high)]">
                  {institute.name}
                </span>
                <span className="text-xs text-[var(--ecce-color-ink-mid)]">
                  {institute.city}, {institute.country}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
