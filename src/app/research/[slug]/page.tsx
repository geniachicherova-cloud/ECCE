import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LinkedEntities } from "@/components/content/LinkedEntities";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, StatBlock, WPBadge } from "@/components/ui";
import {
  findPerson,
  findWorkPackage,
  institutesForWorkPackage,
  insightsForWorkPackage,
  newsForWorkPackage,
  peopleForWorkPackage,
  publicationsForWorkPackage,
} from "@/lib/content/collections";
import { routeForWorkPackage, wpSlugByRoute } from "@/lib/content/labels";
import keyFiguresData from "../../../../content/data/key-figures.json";
import type { KeyFigure, WPSlug } from "@/lib/content/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(wpSlugByRoute).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const wp = findWorkPackage(wpSlugByRoute[slug]);
  return {
    title: wp?.title_en ?? "Work package",
    description: wp?.summary_en,
  };
}

export default async function WorkPackagePage({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { slug } = await params;
  const wpSlug = wpSlugByRoute[slug];
  const wp = findWorkPackage(wpSlug);
  if (!wp) notFound();

  const lead = findPerson(wp.leadPI);
  const people = peopleForWorkPackage(wp.slug).filter((person) => person.slug !== lead?.slug);
  const institutes = institutesForWorkPackage(wp.slug);
  const figures = (keyFiguresData.figures as KeyFigure[]).filter((figure) => figure.showOn?.includes(routeForWorkPackage(wp.slug)));
  const publications = publicationsForWorkPackage(wp.slug);
  const news = newsForWorkPackage(wp.slug);
  const insights = insightsForWorkPackage(wp.slug);

  return (
    <PageShell>
      <SectionHeader eyebrow={`WP${wp.number}`} title={wp.title_en} lead={wp.summary_en} />
      <div className="mt-6">
        <WPBadge wp={wp.slug as WPSlug} />
      </div>
      {figures.length > 0 ? (
        <div className="mt-10">
          <StatBlock figures={figures} />
        </div>
      ) : null}
      <article className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--ecce-color-ink-mid)]">
        <p>{wp.summary_en}</p>
      </article>
      <LinkedEntities
        title="Lead PI"
        items={lead ? [{ href: `/team/people/${lead.slug}`, label: lead.fullName, meta: lead.title }] : []}
      />
      <LinkedEntities
        title="Linked team members"
        items={people.map((person) => ({ href: `/team/people/${person.slug}`, label: person.fullName, meta: person.role }))}
      />
      <LinkedEntities
        title="Linked institutes"
        items={institutes.map((institute) => ({
          href: `/partner-institutes/${institute.slug}`,
          label: institute.name,
          meta: institute.country,
        }))}
      />
      <LinkedEntities
        title="Publications"
        items={publications.map((publication) => ({
          href: publication.url,
          label: publication.title,
          meta: publication.journal,
        }))}
      />
      <LinkedEntities
        title="News and insights"
        items={[
          ...news.map((item) => ({ href: `/news/${item.slug}`, label: item.title_en, meta: item.type })),
          ...insights.map((item) => ({ href: `/insights/${item.slug}`, label: item.title_en, meta: item.category })),
        ]}
      />
    </PageShell>
  );
}
