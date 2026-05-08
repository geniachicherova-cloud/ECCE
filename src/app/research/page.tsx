import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EntityGrid } from "@/components/content/EntityGrid";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, StatBlock } from "@/components/ui";
import { allWorkPackages, findPerson } from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";
import keyFiguresData from "../../../content/data/key-figures.json";
import type { KeyFigure } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Research",
  description: "The five ECCE work packages across epidemiology, genomics, microbiome research, integration, and coordination.",
};

export default function ResearchPage(): ReactNode {
  const figures = (keyFiguresData.figures as KeyFigure[]).filter((figure) => figure.showOn?.includes("/research"));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Research"
        title="Five work packages connect samples, genomes, microbiomes, and causal modelling."
        lead="WP4 is the scientific integration core, linking epidemiology, whole-genome sequencing, and microbiome-derived mutagen discovery."
      />
      <div className="mt-10">
        <StatBlock figures={figures} />
      </div>
      <section className="mt-16">
        <EntityGrid
          items={allWorkPackages.map((wp) => ({
            href: routeForWorkPackage(wp.slug),
            title: wp.title_en,
            eyebrow: wp.isCentral ? "integration core" : `WP${wp.number}`,
            body: `${wp.hook_en} Lead: ${findPerson(wp.leadPI)?.fullName ?? wp.leadPI}.`,
            workPackages: [wp.slug],
          }))}
        />
      </section>
    </PageShell>
  );
}
