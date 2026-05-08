import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Prototype privacy page draft.",
};

export default function PrivacyPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Privacy"
        title="Prototype privacy page"
        lead="This private prototype does not load analytics, ads, trackers, or external font CDNs."
      />
      <div className="mt-8">
        <Tag tone="amber">Draft pending IARC communications review</Tag>
      </div>
    </PageShell>
  );
}
