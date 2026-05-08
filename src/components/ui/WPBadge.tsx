import type { ReactNode } from "react";
import type { WPSlug } from "@/lib/content/types";
import { Tag } from "@/components/ui/Tag";

export function WPBadge({ wp }: { wp: WPSlug }): ReactNode {
  return <Tag tone="wp">{wp.toUpperCase()}</Tag>;
}
