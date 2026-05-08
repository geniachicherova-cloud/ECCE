"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { EntityGrid } from "@/components/content/EntityGrid";
import type { Institute } from "@/lib/content/collections";
import type { Region } from "@/lib/content/types";

const PartnerMap = dynamic(() => import("@/components/map/PartnerMap").then((mod) => mod.PartnerMap), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[520px] items-center justify-center rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] text-[var(--ecce-color-ink-mid)]">
      Loading institute map...
    </div>
  ),
});

export function FilteredInstituteDirectory({ institutes }: { institutes: Institute[] }): ReactNode {
  const region = useSearchParams().get("region") as Region | null;
  const filtered = region ? institutes.filter((institute) => institute.region === region) : institutes;

  return (
    <>
      <section className="mt-10">
        <PartnerMap institutes={filtered} />
      </section>
      <section className="mt-12">
        <EntityGrid
          items={filtered.map((institute) => ({
            href: `/partner-institutes/${institute.slug}`,
            title: institute.name,
            region: institute.region,
            body: `${institute.city}, ${institute.country}`,
            workPackages: institute.workPackages,
          }))}
        />
      </section>
    </>
  );
}
