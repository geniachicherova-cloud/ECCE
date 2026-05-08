import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui";
import { allInstitutes } from "@/lib/content/collections";
import { NetworkMapLazy } from "./NetworkMap.client";

export function NetworkAct(): ReactNode {
  return (
    <section
      aria-labelledby="network-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="6"
      id="network"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-end">
        <SectionHeader
          eyebrow="Global research network"
          lead="The ECCE consortium connects 36 institutes across 27 countries — pairing the diversity needed to detect global patterns with the depth needed to interpret them."
          title="35 institutes. 5 continents. One question."
        />
        <p
          className="font-serif text-2xl leading-snug text-[var(--ecce-color-ink-mid)]"
          id="network-title"
        >
          Hover any pin to pause the rotation. Click to open the institute card.
        </p>
      </div>

      <div className="mt-12">
        <NetworkMapLazy institutes={allInstitutes} />
      </div>
    </section>
  );
}
