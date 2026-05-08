import type { ReactNode } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui";

export function SampleJourneyAct(): ReactNode {
  return (
    <section
      aria-labelledby="sample-journey-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="8"
      data-pending="g14-sequence"
      id="sample-journey"
    >
      <SectionHeader
        eyebrow="Sample journey"
        lead="One tube of biological material travels three continents and twelve months. The visual sequence for this act is in production."
        title="From a clinic in Lyon to a sequencer in Cambridge to a model in San Diego — the journey of a single ECCE sample."
      />

      <figure
        className="mt-12 overflow-hidden rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-8"
        id="sample-journey-title"
      >
        <Image
          alt="Schematic placeholder of an ECCE sample's journey from clinic to sequencer to integration model. Final visual sequence pending."
          className="mx-auto h-auto w-full max-w-3xl"
          height={420}
          src="/assets/sample-journey-placeholder.svg"
          unoptimized
          width={840}
        />
        <figcaption className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
          Visual sequence in production · scroll-pinned scrub will replace this still on next iteration.
        </figcaption>
      </figure>
    </section>
  );
}
