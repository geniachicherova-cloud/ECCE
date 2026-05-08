import {
  people,
  institutes,
  workPackages,
  meetings,
  publications,
  insights,
  news,
  type Institute,
  type Insight,
  type Meeting,
  type NewsItem,
  type Person,
  type Publication,
  type WorkPackage,
} from "@content/index";

export type { Institute, Insight, Meeting, NewsItem, Person, Publication, WorkPackage };

export const allPeople = people.filter((person) => person.isPublic).sort((a, b) => a.fullName.localeCompare(b.fullName));
export const allInstitutes = institutes.sort((a, b) => a.name.localeCompare(b.name));
export const allWorkPackages = workPackages.sort((a, b) => a.position - b.position);
export const allMeetings = meetings.sort((a, b) => b.date.localeCompare(a.date));
export const allPublications = publications.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
export const allInsights = insights.filter((item) => item.isPublic).sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
export const allNews = news.filter((item) => item.isPublic).sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

export function findPerson(slug: string): Person | undefined {
  return allPeople.find((person) => person.slug === slug);
}

export function findInstitute(slug: string): Institute | undefined {
  return allInstitutes.find((institute) => institute.slug === slug);
}

export function findWorkPackage(slug: string): WorkPackage | undefined {
  return allWorkPackages.find((workPackage) => workPackage.slug === slug);
}

export function findNews(slug: string): NewsItem | undefined {
  return allNews.find((item) => item.slug === slug);
}

export function findInsight(slug: string): Insight | undefined {
  return allInsights.find((item) => item.slug === slug);
}

export function peopleForInstitute(instituteSlug: string): Person[] {
  return allPeople.filter((person) => person.affiliations.includes(instituteSlug));
}

export function peopleForWorkPackage(wpSlug: string): Person[] {
  return allPeople.filter((person) => person.workPackages.includes(wpSlug as Person["workPackages"][number]));
}

export function institutesForWorkPackage(wpSlug: string): Institute[] {
  return allInstitutes.filter((institute) => institute.workPackages.includes(wpSlug as Institute["workPackages"][number]));
}

export function publicationsForWorkPackage(wpSlug: string): Publication[] {
  return allPublications.filter((publication) => publication.workPackages.includes(wpSlug as Publication["workPackages"][number]));
}

export function newsForWorkPackage(wpSlug: string): NewsItem[] {
  return allNews.filter((item) => item.workPackages?.includes(wpSlug as NonNullable<NewsItem["workPackages"]>[number]));
}

export function insightsForWorkPackage(wpSlug: string): Insight[] {
  return allInsights.filter((item) => item.workPackages?.includes(wpSlug as NonNullable<Insight["workPackages"]>[number]));
}
