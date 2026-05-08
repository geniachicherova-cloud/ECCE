"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const ACTS: { id: string; label: string }[] = [
  { id: "hero", label: "01 · Hero" },
  { id: "problem", label: "02 · Problem" },
  { id: "hypothesis", label: "03 · Hypothesis" },
  { id: "signatures", label: "04 · Signatures" },
  { id: "microbiome", label: "05 · Microbiome" },
  { id: "network", label: "06 · Network" },
  { id: "work-packages", label: "07 · Work packages" },
  { id: "sample-journey", label: "08 · Sample journey" },
  { id: "news", label: "09 · News" },
  { id: "contact-cta", label: "10 · Contact" },
];

export function ScrollProgressRail(): ReactNode {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = ACTS.map((act) => document.getElementById(act.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Homepage chapters"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="pointer-events-auto flex flex-col">
        {ACTS.map((act) => {
          const isActive = activeId === act.id;
          return (
            <li key={act.id}>
              <a
                aria-current={isActive ? "true" : undefined}
                className={`group flex min-h-[28px] items-center gap-3 px-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "text-[var(--ecce-color-accent-signal)]"
                    : "text-[var(--ecce-color-ink-mid)] hover:text-[var(--ecce-color-ink-high)]"
                }`}
                href={`#${act.id}`}
              >
                <span
                  aria-hidden
                  className={`block h-px transition-all ${
                    isActive ? "w-9 bg-[var(--ecce-color-accent-signal)]" : "w-5 bg-[var(--ecce-color-line-default)]"
                  }`}
                />
                <span
                  className={`whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 ${
                    isActive ? "opacity-100" : ""
                  }`}
                >
                  {act.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
