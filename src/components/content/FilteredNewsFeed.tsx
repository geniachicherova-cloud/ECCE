"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { EntityGrid } from "@/components/content/EntityGrid";
import type { NewsItem } from "@/lib/content/collections";

export function FilteredNewsFeed({ items }: { items: NewsItem[] }): ReactNode {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const wp = searchParams.get("wp");
  const region = searchParams.get("region");
  const filtered = items.filter((item) => {
    if (type && item.type !== type) return false;
    if (wp && !item.workPackages?.includes(wp as NonNullable<NewsItem["workPackages"]>[number])) return false;
    if (region && item.region !== region) return false;
    return true;
  });

  return (
    <section className="mt-10">
      <EntityGrid
        items={filtered.map((item) => ({
          href: `/news/${item.slug}`,
          title: item.title_en,
          eyebrow: item.type,
          body: item.summary_en,
          region: item.region,
          workPackages: item.workPackages,
        }))}
      />
    </section>
  );
}
