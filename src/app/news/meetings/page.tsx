import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EntityGrid } from "@/components/content/EntityGrid";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui";
import { allMeetings } from "@/lib/content/collections";

export const metadata: Metadata = {
  title: "Meetings",
  description: "ECCE consortium meetings.",
};

export default function MeetingsPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader eyebrow="Meetings" title="Consortium meetings and events." lead="Meeting records can link back to news items and work packages." />
      <section className="mt-10">
        <EntityGrid
          items={allMeetings.map((meeting) => ({
            href: `/news?type=meeting`,
            title: meeting.title,
            eyebrow: meeting.status,
            body: `${meeting.date}${meeting.location ? ` · ${meeting.location}` : ""}`,
            workPackages: meeting.workPackages,
          }))}
        />
      </section>
    </PageShell>
  );
}
