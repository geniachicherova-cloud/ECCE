"use client";

import dynamic from "next/dynamic";

export const EoCRCChartLazy = dynamic(() => import("./EoCRCChart").then((m) => m.EoCRCChart), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center rounded-[var(--ecce-radius-md)] border border-[var(--ecce-color-line-subtle)] text-[var(--ecce-color-ink-mid)]">
      Loading chart…
    </div>
  ),
});
