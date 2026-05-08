import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/content/JsonLd";
import { LinkedEntities } from "@/components/content/LinkedEntities";
import { PageShell } from "@/components/layout/PageShell";
import { RegionBadge, SectionHeader, WPBadge } from "@/components/ui";
import {
  allInstitutes,
  findInstitute,
  findPerson,
  findWorkPackage,
  peopleForInstitute,
} from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";
import { organizationJsonLd } from "@/lib/seo/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allInstitutes.map((institute) => ({ slug: institute.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const institute = findInstitute(slug);
  return {
    title: institute?.name ?? "Institute",
    description: institute ? `${institute.name}, ${institute.city}, ${institute.country}` : undefined,
  };
}

export default async function InstitutePage({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { slug } = await params;
  const institute = findInstitute(slug);
  if (!institute) notFound();
  const leads = institute.leadInvestigators.map(findPerson).filter((person) => person !== undefined);
  const affiliatedPeople = peopleForInstitute(institute.slug);
  const workPackages = institute.workPackages.map(findWorkPackage).filter((wp) => wp !== undefined);

  return (
    <PageShell>
      <JsonLd data={organizationJsonLd(institute)} />
      <SectionHeader eyebrow="Partner institute" title={institute.name} lead={`${institute.city}, ${institute.country}`} />
      <div className="mt-6 flex flex-wrap gap-2">
        <RegionBadge region={institute.region} />
        {institute.workPackages.map((wp) => <WPBadge key={wp} wp={wp} />)}
      </div>
      <article className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--ecce-color-ink-mid)]">
        <p>{institute.description_en}</p>
      </article>
      <LinkedEntities
        title="Lead investigators"
        items={leads.map((person) => ({
          href: `/team/people/${person.slug}`,
          label: person.fullName,
          meta: person.title,
        }))}
      />
      <LinkedEntities
        title="Affiliated people"
        items={affiliatedPeople.map((person) => ({
          href: `/team/people/${person.slug}`,
          label: person.fullName,
          meta: person.role,
        }))}
      />
      <LinkedEntities
        title="Work packages"
        items={workPackages.map((wp) => ({
          href: routeForWorkPackage(wp.slug),
          label: wp.title_en,
          meta: wp.slug.toUpperCase(),
        }))}
      />
    </PageShell>
  );
}
