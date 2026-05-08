import type { ReactNode } from "react";
import { Card, RegionBadge, Tag, WPBadge } from "@/components/ui";
import type { Region, WPSlug } from "@/lib/content/types";

export function EntityGrid({
  items,
}: {
  items: Array<{
    href: string;
    title: string;
    eyebrow?: string;
    body?: string;
    region?: Region;
    workPackages?: WPSlug[];
  }>;
}): ReactNode {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card href={item.href} key={item.href}>
          <div className="mb-4 flex flex-wrap gap-2">
            {item.region ? <RegionBadge region={item.region} /> : null}
            {item.workPackages?.map((wp) => <WPBadge key={wp} wp={wp} />)}
            {item.eyebrow ? <Tag>{item.eyebrow}</Tag> : null}
          </div>
          <h2 className="font-serif text-2xl font-semibold leading-tight">{item.title}</h2>
          {item.body ? <p className="mt-3 text-[var(--ecce-color-ink-mid)]">{item.body}</p> : null}
        </Card>
      ))}
    </div>
  );
}
