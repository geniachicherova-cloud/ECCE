import type { ReactNode } from "react";
import type { KeyFigure as KeyFigureData } from "@/lib/content/types";

export function formatKeyFigure(figure: KeyFigureData): string {
  const number = new Intl.NumberFormat("en").format(figure.value);
  const prefix = figure.prefix ?? "";
  const suffix = figure.unit ?? "";

  if (figure.display === "approx") return `${prefix}${number}${suffix}`;
  if (figure.display === "target") return `${prefix}${number}${suffix}`;
  return `${prefix}${number}${suffix}`;
}

export function KeyFigure({ figure }: { figure: KeyFigureData }): ReactNode {
  return (
    <div className="border-l-2 border-[var(--ecce-color-accent-signal)] py-1 pl-5">
      <div className="font-serif text-5xl font-semibold leading-none text-[var(--ecce-color-ink-high)]">
        {formatKeyFigure(figure)}
      </div>
      <div className="mt-2 text-base text-[var(--ecce-color-ink-mid)]">{figure.label_en}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-low)]">
        {figure.display === "target" ? "Target" : "Updated"} {figure.asOf}
      </div>
      <div className="sr-only">
        Source: {figure.source.label}. Owner: {figure.owner}.
      </div>
    </div>
  );
}
