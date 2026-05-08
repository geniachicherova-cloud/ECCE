"use client";

import dynamic from "next/dynamic";

export const NetworkMapLazy = dynamic(() => import("./NetworkMap").then((m) => m.NetworkMap), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[480px] items-center justify-center rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] text-[var(--ecce-color-ink-mid)]">
      Loading network map…
    </div>
  ),
});
