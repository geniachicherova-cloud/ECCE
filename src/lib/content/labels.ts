import type { Region, WPSlug } from "@/lib/content/types";

export const regionLabels: Record<Region, string> = {
  africa: "Africa",
  asia: "Asia",
  europe: "Europe",
  "n-america": "North America",
  "s-america": "South America",
};

export const wpRouteBySlug: Record<WPSlug, string> = {
  wp1: "/research/wp1-epidemiology",
  wp2: "/research/wp2-genomics",
  wp3: "/research/wp3-microbiome",
  wp4: "/research/wp4-integration",
  wp5: "/research/wp5-coordination",
};

export const wpSlugByRoute: Record<string, WPSlug> = {
  "wp1-epidemiology": "wp1",
  "wp2-genomics": "wp2",
  "wp3-microbiome": "wp3",
  "wp4-integration": "wp4",
  "wp5-coordination": "wp5",
};

export function routeForWorkPackage(slug: WPSlug): string {
  return wpRouteBySlug[slug];
}
