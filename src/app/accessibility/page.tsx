import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Prototype accessibility statement draft.",
};

export default function AccessibilityPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Accessibility"
        title="Accessibility statement draft"
        lead="The prototype target is WCAG 2.2 AA, with automated checks and manual screen-reader passes scheduled in Phase E."
      />
      <div className="mt-8">
        <Tag tone="amber">Draft pending IARC communications review</Tag>
      </div>
    </PageShell>
  );
}
