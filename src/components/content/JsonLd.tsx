import type { ReactNode } from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }): ReactNode {
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
