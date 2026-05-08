import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { FilteredInstituteDirectory } from "@/components/content/FilteredInstituteDirectory";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink, SectionHeader, StatBlock } from "@/components/ui";
import { allInstitutes } from "@/lib/content/collections";
import { regionLabels } from "@/lib/content/labels";
import type { Region, KeyFigure } from "@/lib/content/types";
import keyFiguresData from "../../../content/data/key-figures.json";

export const metadata: Metadata = {
  title: "Partner Institutes",
  description: "ECCE partner institutes across Africa, Asia, Europe, North America, and South America.",
};

export default function PartnerInstitutesPage(): ReactNode {
  const figures = (keyFiguresData.figures as KeyFigure[]).filter((figure) => figure.showOn?.includes("/partner-institutes"));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Partner institutes"
        title="A global network spanning five continents."
        lead="The map and institute pages are generated from MDX institute records, so filters and reverse links stay aligned with content."
      />
      <div className="mt-10">
        <StatBlock figures={figures} />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/partner-institutes" variant="secondary">
          All regions
        </ButtonLink>
        {(Object.keys(regionLabels) as Region[]).map((region) => (
          <ButtonLink
            href={`/partner-institutes?region=${region}`}
            key={region}
            variant="secondary"
          >
            {regionLabels[region]}
          </ButtonLink>
        ))}
      </div>
      <Suspense fallback={<p className="mt-10 text-[var(--ecce-color-ink-mid)]">Loading institute directory...</p>}>
        <FilteredInstituteDirectory institutes={allInstitutes} />
      </Suspense>
    </PageShell>
  );
}
