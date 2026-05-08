import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LinkedEntities } from "@/components/content/LinkedEntities";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader, WPBadge } from "@/components/ui";
import { allNews, findNews, findPerson, findWorkPackage } from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findNews(slug);
  return {
    title: item?.title_en ?? "News",
    description: item?.summary_en,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { slug } = await params;
  const item = findNews(slug);
  if (!item) notFound();
  const workPackages = item.workPackages?.map(findWorkPackage).filter((wp) => wp !== undefined) ?? [];
  const people = item.relatedPersons?.map(findPerson).filter((person) => person !== undefined) ?? [];

  return (
    <PageShell>
      <SectionHeader eyebrow={item.type} title={item.title_en} lead={item.summary_en} />
      <div className="mt-6 flex flex-wrap gap-2">
        {item.workPackages?.map((wp) => <WPBadge key={wp} wp={wp} />)}
      </div>
      <article className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--ecce-color-ink-mid)]">
        <p>{item.body_en ?? item.summary_en}</p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-low)]">
          Published {item.publishedDate}
        </p>
      </article>
      <LinkedEntities
        title="Related work packages"
        items={workPackages.map((wp) => ({ href: routeForWorkPackage(wp.slug), label: wp.title_en, meta: wp.slug.toUpperCase() }))}
      />
      <LinkedEntities
        title="Related people"
        items={people.map((person) => ({ href: `/team/people/${person.slug}`, label: person.fullName, meta: person.role }))}
      />
    </PageShell>
  );
}
