import type { Institute, Person, Publication } from "@/lib/content/collections";

const siteUrl = "https://ecce-prototype.local";

export function organizationJsonLd(institute?: Institute): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: institute?.name ?? "ECCE Project",
    url: institute?.url ?? siteUrl,
    address: institute
      ? {
          "@type": "PostalAddress",
          addressLocality: institute.city,
          addressCountry: institute.country,
        }
      : undefined,
  };
}

export function personJsonLd(person: Person): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    jobTitle: person.title,
    email: person.email,
    identifier: person.orcid,
  };
}

export function scholarlyArticleJsonLd(publication: Publication): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publication.title,
    author: publication.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: publication.publishedDate,
    isAccessibleForFree: publication.isOpenAccess,
    sameAs: publication.url,
    identifier: publication.doi,
  };
}
