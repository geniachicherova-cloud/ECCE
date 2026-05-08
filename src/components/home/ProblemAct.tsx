import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui";
import { EoCRCChartLazy } from "./EoCRCChart.client";

type Stat = {
  value: string;
  label: string;
  source: string;
  marker?: string;
};

const stats: Stat[] = [
  {
    value: "↑ ~2×",
    label: "Rate ratio of early-onset colorectal cancer in the 1990 birth cohort versus 1950 across high-income countries.",
    source: "IARC CI5 Volume XI; Downham et al. 2026, JNCI",
    marker: "[STAND-IN]",
  },
  {
    value: "<50",
    label: "Age threshold defining early-onset colorectal cancer — and the demographic in which incidence is rising fastest.",
    source: "World Cancer Research Fund classification",
  },
  {
    value: "27",
    label: "Countries currently contributing samples and metadata to the ECCE global cohort.",
    source: "ECCE consortium register (WP5)",
  },
];

export function ProblemAct(): ReactNode {
  return (
    <section
      aria-labelledby="problem-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="2"
      id="problem"
    >
      <SectionHeader
        eyebrow="The problem"
        lead="Across high-income and transitioning countries, colorectal cancer is appearing earlier — in people under 50 — and the trend has been accelerating with each successive birth cohort since the 1950s."
        title="A generational shift in colorectal cancer."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <li
              className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6"
              key={stat.label}
            >
              <p className="font-serif text-4xl font-semibold leading-none text-[var(--ecce-color-accent-signal)]">
                {stat.value}
              </p>
              <p className="mt-3 text-[var(--ecce-color-ink-mid)]">{stat.label}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
                {stat.marker ? <span className="mr-2">{stat.marker}</span> : null}
                {stat.source}
              </p>
            </li>
          ))}
        </ul>

        <div className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6">
          <p
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]"
            id="problem-title"
          >
            Incidence by birth cohort
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[var(--ecce-color-ink-high)]">
            Each generation born after 1950 carries a higher risk than the one before it.
          </h3>
          <div className="mt-6">
            <EoCRCChartLazy />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ecce-color-ink-mid)]">
            Source shape: IARC CI5 XI cohort tabulations and Downham et al. 2026 (JNCI). Final values pending validation.
          </p>
        </div>
      </div>
    </section>
  );
}
