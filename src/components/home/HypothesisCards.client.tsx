"use client";

import dynamic from "next/dynamic";

export const HypothesisCardsLazy = dynamic(
  () => import("./HypothesisCards").then((m) => m.HypothesisCards),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            className="min-h-[180px] rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6"
            key={i}
          />
        ))}
      </div>
    ),
  },
);
