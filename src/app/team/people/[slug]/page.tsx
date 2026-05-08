import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/content/JsonLd";
import { LinkedEntities } from "@/components/content/LinkedEntities";
import { PageShell } from "@/components/layout/PageShell";
import { RegionBadge, SectionHeader, WPBadge } from "@/components/ui";
import { allPeople, findInstitute, findPerson, findWorkPackage } from "@/lib/content/collections";
import { routeForWorkPackage } from "@/lib/content/labels";
import { personJsonLd } from "@/lib/seo/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allPeople.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const person = findPerson(slug);
  return {
    title: person?.fullName ?? "Person",
    description: person ? `${person.fullName}, ${person.title}` : undefined,
  };
}

export default async function PersonPage({ params }: { params: Promise<Params> }): Promise<ReactNode> {
  const { slug } = await params;
  const person = findPerson(slug);
  if (!person) notFound();
  const primaryInstitute = findInstitute(person.primaryAffiliation);
  const institutes = person.affiliations.map(findInstitute).filter((item) => item !== undefined);
  const workPackages = person.workPackages.map(findWorkPackage).filter((item) => item !== undefined);

  return (
    <PageShell>
      <JsonLd data={personJsonLd(person)} />
      <SectionHeader eyebrow={person.role.replace("-", " ")} title={person.fullName} lead={person.title} />
      <div className="mt-6 flex flex-wrap gap-2">
        {primaryInstitute ? <RegionBadge region={primaryInstitute.region} /> : null}
        {person.workPackages.map((wp) => <WPBadge key={wp} wp={wp} />)}
      </div>
      <article className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--ecce-color-ink-mid)]">
        <p>{person.bio_en}</p>
      </article>
      <LinkedEntities
        title="Institutes"
        items={institutes.map((institute) => ({
          href: `/partner-institutes/${institute.slug}`,
          label: institute.name,
          meta: institute.country,
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
