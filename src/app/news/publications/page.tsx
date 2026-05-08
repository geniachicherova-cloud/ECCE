import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EntityGrid } from "@/components/content/EntityGrid";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui";
import { allPublications } from "@/lib/content/collections";

export const metadata: Metadata = {
  title: "Publications",
  description: "ECCE and related publications.",
};

export default function PublicationsPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Publications"
        title="ECCE publications will appear here after scientific release."
        lead="The template is ready; seeded content keeps this empty until public publications are approved."
      />
      <section className="mt-10">
        <EntityGrid
          items={allPublications.map((publication) => ({
            href: publication.url,
            title: publication.title,
            eyebrow: publication.journal,
            body: publication.abstract_en,
            workPackages: publication.workPackages,
          }))}
        />
      </section>
    </PageShell>
  );
}
