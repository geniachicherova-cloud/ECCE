import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { EntityGrid } from "@/components/content/EntityGrid";
import { SectionHeader, StatBlock } from "@/components/ui";
import { allPeople, findInstitute } from "@/lib/content/collections";
import keyFiguresData from "../../../content/data/key-figures.json";
import type { KeyFigure } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Team",
  description: "ECCE leadership, core team, and partner lead investigators.",
};

export default function TeamPage(): ReactNode {
  const figures = (keyFiguresData.figures as KeyFigure[]).filter((figure) => figure.showOn?.includes("/team"));
  const leadership = allPeople.filter((person) => person.role === "pi" || person.role === "core-team");
  const partnerLeads = allPeople.filter((person) => person.role === "partner-lead");

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Team"
        title="A global scientific consortium with four principal investigators."
        lead="Person records link forward to institutes and work packages; reverse relationships are derived at build time."
      />
      <div className="mt-10">
        <StatBlock figures={figures} />
      </div>
      <section className="mt-16">
        <h2 className="mb-6 font-serif text-3xl font-semibold">Leadership and core team</h2>
        <EntityGrid
          items={leadership.map((person) => ({
            href: `/team/people/${person.slug}`,
            title: person.fullName,
            eyebrow: person.role.replace("-", " "),
            body: `${person.title} · ${findInstitute(person.primaryAffiliation)?.shortName ?? findInstitute(person.primaryAffiliation)?.name ?? person.primaryAffiliation}`,
            workPackages: person.workPackages,
          }))}
        />
      </section>
      <section className="mt-16">
        <h2 className="mb-6 font-serif text-3xl font-semibold">Partner lead investigators</h2>
        <EntityGrid
          items={partnerLeads.map((person) => ({
            href: `/team/people/${person.slug}`,
            title: person.fullName,
            eyebrow: "partner lead",
            body: findInstitute(person.primaryAffiliation)?.name,
            workPackages: person.workPackages,
          }))}
        />
      </section>
    </PageShell>
  );
}
