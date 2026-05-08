import type { ReactNode } from "react";
import type { Region } from "@/lib/content/types";
import { Tag } from "@/components/ui/Tag";

const labels: Record<Region, string> = {
  africa: "Africa",
  asia: "Asia",
  europe: "Europe",
  "n-america": "N. America",
  "s-america": "S. America",
};

export function RegionBadge({ region }: { region: Region }): ReactNode {
  return <Tag tone="region">{labels[region]}</Tag>;
}
