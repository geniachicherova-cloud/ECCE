import type { MetadataRoute } from "next";
import { allInsights, allInstitutes, allNews, allPeople } from "@/lib/content/collections";
import { wpRouteBySlug } from "@/lib/content/labels";

export const dynamic = "force-static";

const baseUrl = "https://ecce-prototype.local";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/research",
    ...Object.values(wpRouteBySlug),
    "/colorectal-cancer",
    "/team",
    "/partner-institutes",
    "/news",
    "/news/publications",
    "/news/meetings",
    "/insights",
    "/contact",
    "/open-science",
    "/privacy",
    "/accessibility",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-05-08") })),
    ...allPeople.map((person) => ({ url: `${baseUrl}/team/people/${person.slug}`, lastModified: new Date(person.lastUpdated) })),
    ...allInstitutes.map((institute) => ({
      url: `${baseUrl}/partner-institutes/${institute.slug}`,
      lastModified: new Date(institute.lastUpdated),
    })),
    ...allNews.map((item) => ({ url: `${baseUrl}/news/${item.slug}`, lastModified: new Date(item.lastUpdated) })),
    ...allInsights.map((item) => ({ url: `${baseUrl}/insights/${item.slug}`, lastModified: new Date(item.lastUpdated) })),
  ];
}
