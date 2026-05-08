import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeader, Tag } from "@/components/ui";
import { allWorkPackages, findPerson } from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";
import type { WPSlug } from "@/lib/content/types";

const SUMMARIES: Record<WPSlug, string> = {
  wp1: "WP1 builds the foundational global cohort. Coordinating with 35 partner institutes worldwide, this package secures high-quality samples and harmonised epidemiological metadata, ensuring our genomic findings are globally representative — not Euro-centric.",
  wp2: "WP2 reads the genomes. Whole genome sequencing of tumour and normal tissue extracts mutational signatures — the physical evidence of what damaged DNA decades before a tumour formed. SBS88 is the prime suspect.",
  wp3: "WP3 profiles the microbiome and the mutagenic byproducts of bacterial residents like pks⁺ E. coli. The aim is to connect early-life bacterial exposures to late-life cancer development through specific mechanistic links.",
  wp4: "WP4 is the integration core. It fuses massive datasets from the other packages — global epidemiology, genomic signatures, microbiome profiles — and is responsible for proving or disproving the overarching hypothesis through advanced bioinformatics.",
  wp5: "WP5 manages the consortium and our open-science mandate. Beyond administration, it ensures data is shared ethically and transparently, while building research capacity in low- and middle-income partner countries.",
};

function getMonogram(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function WorkPackagesAct(): ReactNode {
  return (
    <section
      aria-labelledby="work-packages-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="7"
      id="work-packages"
    >
      <SectionHeader
        eyebrow="Five work packages"
        lead="Each work package owns one piece of the causal chain. WP4 sits at the centre — fusing the others into a single, testable explanation."
        title="How the science is organised."
      />

      <div className="mt-12 grid auto-rows-[1fr] gap-6 lg:grid-cols-3">
        {allWorkPackages.map((wp) => {
          const lead = findPerson(wp.leadPI);
          const isCentral = wp.isCentral;
          const summary = SUMMARIES[wp.slug];
          const monogram = lead ? getMonogram(lead.fullName) : "—";
          return (
            <article
              className={`group relative overflow-hidden rounded-[var(--ecce-radius-lg)] border bg-[var(--ecce-color-background-elevated)] p-6 transition-shadow duration-200 hover:shadow-[var(--ecce-shadow-card-hover)] ${
                isCentral
                  ? "border-[var(--ecce-color-accent-amber)] bg-gradient-to-br from-[rgba(240,184,110,0.08)] to-transparent lg:col-span-2"
                  : "border-[var(--ecce-color-line-subtle)]"
              }`}
              data-central={isCentral || undefined}
              key={wp.slug}
            >
              <Link
                aria-label={`${wp.title_en} — work package ${wp.number}`}
                className="absolute inset-0 z-10"
                href={routeForWorkPackage(wp.slug)}
              />
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
                    {isCentral ? "Integration core" : `Work package ${wp.number}`}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[var(--ecce-color-ink-high)]">
                    {wp.title_en}
                  </h3>
                </div>
                <Tag tone="wp">WP{wp.number}</Tag>
              </header>
              <p className="mt-4 font-serif text-lg leading-snug text-[var(--ecce-color-ink-high)]">
                {wp.hook_en}
              </p>
              <p className="mt-3 text-[var(--ecce-color-ink-mid)]">{summary}</p>

              <footer className="relative z-20 mt-6 flex items-center gap-3 border-t border-[var(--ecce-color-line-subtle)] pt-4">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ecce-color-background-base)] font-mono text-sm font-semibold text-[var(--ecce-color-accent-signal)] transition group-hover:bg-[var(--ecce-color-accent-signal)] group-hover:text-[#06281f]"
                >
                  {monogram}
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
                    Lead PI
                  </p>
                  <p className="text-sm text-[var(--ecce-color-ink-high)]">
                    {lead?.fullName ?? wp.leadPI}
                  </p>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
      <p className="sr-only" id="work-packages-title">
        Five ECCE work packages.
      </p>
    </section>
  );
}
