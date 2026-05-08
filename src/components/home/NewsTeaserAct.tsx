import type { ReactNode } from "react";
import { ButtonLink, Card, RegionBadge, SectionHeader, Tag, WPBadge } from "@/components/ui";
import { allNews } from "@/lib/content/collections";

const TYPE_LABEL: Record<string, string> = {
  publication: "Publication",
  meeting: "Meeting",
  "field-report": "Field report",
  press: "Press",
  milestone: "Milestone",
  announcement: "Announcement",
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function NewsTeaserAct(): ReactNode {
  const items = allNews.slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="news-teaser-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="9"
      id="news"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Latest"
          lead="Publications, meetings, and field reports as they ship — at the pace the consortium actually moves."
          title="What&rsquo;s new from ECCE."
        />
        <ButtonLink href="/news" variant="secondary">
          All news & insights
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" id="news-teaser-title">
        {items.map((item) => (
          <Card href={`/news/${item.slug}`} key={item.slug}>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {item.region ? <RegionBadge region={item.region} /> : null}
              {item.workPackages?.map((wp) => <WPBadge key={wp} wp={wp} />)}
              <Tag>{TYPE_LABEL[item.type] ?? item.type}</Tag>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
                {formatDate(item.publishedDate)}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-semibold leading-tight text-[var(--ecce-color-ink-high)]">
              {item.title_en}
            </h3>
            <p className="mt-3 text-[var(--ecce-color-ink-mid)]">{item.summary_en}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
              Read more →
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
