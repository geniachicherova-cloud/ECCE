import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { FilteredNewsFeed } from "@/components/content/FilteredNewsFeed";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink, SectionHeader } from "@/components/ui";
import { allNews } from "@/lib/content/collections";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "ECCE news, publications, meetings, and field updates.",
};

export default function NewsPage(): ReactNode {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="News & insights"
        title="A low-volume feed for consortium updates."
        lead="Filters use URL state so static pages remain linkable and easy to share."
      />
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/news" variant="secondary">All</ButtonLink>
        <ButtonLink href="/news?type=meeting" variant="secondary">Meetings</ButtonLink>
        <ButtonLink href="/news?type=publication" variant="secondary">Publications</ButtonLink>
      </div>
      <Suspense fallback={<p className="mt-10 text-[var(--ecce-color-ink-mid)]">Loading news feed...</p>}>
        <FilteredNewsFeed items={allNews} />
      </Suspense>
    </PageShell>
  );
}
