import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EntityGrid } from "@/components/content/EntityGrid";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink, SectionHeader } from "@/components/ui";
import { allInsights } from "@/lib/content/collections";

export const metadata: Metadata = {
  title: "Insights",
  description: "Long-form ECCE field work, sample journey, pathology, and explainer stories.",
};

export default function InsightsPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Insights"
        title="Editorial-grade stories about the work behind ECCE."
        lead="Field reports, the global journey of ECCE samples, and pathology stories from across the consortium."
      />
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/insights/field-work" variant="secondary">Field work</ButtonLink>
        <ButtonLink href="/insights/sample-journey" variant="secondary">Sample journey</ButtonLink>
        <ButtonLink href="/insights/pathology-stories" variant="secondary">Pathology</ButtonLink>
      </div>
      <section className="mt-10">
        <EntityGrid
          items={allInsights.map((item) => ({
            href: `/insights/${item.slug}`,
            title: item.title_en,
            eyebrow: item.category,
            body: item.hook_en,
            region: item.region,
            workPackages: item.workPackages,
          }))}
        />
      </section>
    </PageShell>
  );
}
