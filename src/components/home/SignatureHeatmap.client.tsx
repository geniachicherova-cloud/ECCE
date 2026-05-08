"use client";

import dynamic from "next/dynamic";

export const SignatureHeatmapLazy = dynamic(
  () => import("./SignatureHeatmap").then((m) => m.SignatureHeatmap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[220px] items-center justify-center rounded-[var(--ecce-radius-md)] border border-[var(--ecce-color-line-subtle)] text-[var(--ecce-color-ink-mid)]">
        Loading signature…
      </div>
    ),
  },
);
