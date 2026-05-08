import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LinkedEntities } from "@/components/content/LinkedEntities";
import { PageShell } from "@/components/layout/PageShell";
import { MediaFigure, SectionHeader, WPBadge } from "@/components/ui";
import { allInsights, findInsight, findInstitute, findPerson, findWorkPackage } from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allInsights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findInsight(slug);
  return {
    title: item?.title_en ?? "Insight",
    description: item?.hook_en,
  };
}

export default async function InsightPage({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { slug } = await params;
  const item = findInsight(slug);
  if (!item) notFound();
  const authors = item.authorPersons.map(findPerson).filter((person) => person !== undefined);
  const institutes = item.contributingInstitutes?.map(findInstitute).filter((institute) => institute !== undefined) ?? [];
  const workPackages = item.workPackages?.map(findWorkPackage).filter((wp) => wp !== undefined) ?? [];

  return (
    <PageShell>
      <article className="rounded-[var(--ecce-radius-lg)] bg-[var(--ecce-color-paper-base)] p-8 text-[var(--ecce-color-paper-ink-high)] lg:p-14">
        <SectionHeader eyebrow={item.category} title={item.title_en} lead={item.hook_en} />
        <div className="mt-6 flex flex-wrap gap-2">
          {item.workPackages?.map((wp) => <WPBadge key={wp} wp={wp} />)}
        </div>
        <div className="mt-10">
          <MediaFigure asset={item.coverImage} caption="Prototype visual asset pending review." />
        </div>
        <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-[var(--ecce-color-ink-inverse-mid)]">
          <p>{item.body_en}</p>
        </div>
      </article>
      <LinkedEntities
        title="Authors"
        items={authors.map((person) => ({ href: `/team/people/${person.slug}`, label: person.fullName, meta: person.role }))}
      />
      <LinkedEntities
        title="Contributing institutes"
        items={institutes.map((institute) => ({
          href: `/partner-institutes/${institute.slug}`,
          label: institute.name,
          meta: institute.country,
        }))}
      />
      <LinkedEntities
        title="Work packages"
        items={workPackages.map((wp) => ({ href: routeForWorkPackage(wp.slug), label: wp.title_en, meta: wp.slug.toUpperCase() }))}
      />
    </PageShell>
  );
}
