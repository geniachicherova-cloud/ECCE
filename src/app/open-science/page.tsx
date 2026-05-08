import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Open Science",
  description: "Draft ECCE open-science statement for the private prototype.",
};

export default function OpenSciencePage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Open science"
        title="Draft policy pending scientific and institutional approval."
        lead="ECCE is underpinned by data sharing, code transparency, and reproducibility. This page is a prototype draft for review."
      />
      <div className="mt-8">
        <Tag tone="amber">Draft pending Paul approval</Tag>
      </div>
    </PageShell>
  );
}
