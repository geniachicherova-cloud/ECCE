"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { Drawer } from "@/components/ui";
import type { Institute } from "@/lib/content/collections";

export function PartnerMap({ institutes }: { institutes: Institute[] }): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = useMemo(
    () => institutes.find((institute) => institute.slug === selectedSlug),
    [institutes, selectedSlug],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "/map/ecce-style.json",
      center: [8, 18],
      zoom: 1.25,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    for (const institute of institutes) {
      const element = document.createElement("button");
      element.type = "button";
      element.className =
        "h-4 w-4 rounded-full border border-[#0A0E1A] bg-[#3FE0C5] shadow-[0_0_0_6px_rgba(63,224,197,0.16)]";
      element.setAttribute("aria-label", `Open ${institute.name}`);
      element.addEventListener("click", () => setSelectedSlug(institute.slug));
      new maplibregl.Marker({ element }).setLngLat(institute.coordinates).addTo(map);
    }

    return () => map.remove();
  }, [institutes]);

  return (
    <>
      <div
        aria-label="Interactive map of ECCE partner institutes"
        className="min-h-[520px] overflow-hidden rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)]"
        ref={containerRef}
      />
      <Drawer onClose={() => setSelectedSlug(null)} open={selected !== undefined} title={selected?.name ?? "Institute"}>
        {selected ? (
          <div className="space-y-4 text-[var(--ecce-color-ink-mid)]">
            <p>
              {selected.city}, {selected.country}
            </p>
            <p>{selected.description_en}</p>
            <a className="text-[var(--ecce-color-accent-signal)]" href={`/partner-institutes/${selected.slug}`}>
              View institute page
            </a>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
