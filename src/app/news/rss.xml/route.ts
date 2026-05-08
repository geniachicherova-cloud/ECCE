import { allNews } from "@/lib/content/collections";

export const dynamic = "force-static";

export function GET(): Response {
  const items = allNews
    .map(
      (item) => `
        <item>
          <title>${escapeXml(item.title_en)}</title>
          <link>https://ecce-prototype.local/news/${item.slug}</link>
          <description>${escapeXml(item.summary_en)}</description>
          <pubDate>${new Date(item.publishedDate).toUTCString()}</pubDate>
          <guid>https://ecce-prototype.local/news/${item.slug}</guid>
        </item>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>ECCE News</title>
        <link>https://ecce-prototype.local/news</link>
        <description>ECCE prototype news feed</description>
        ${items}
      </channel>
    </rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[char];
  });
}
