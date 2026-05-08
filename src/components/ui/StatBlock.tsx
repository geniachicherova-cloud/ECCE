import type { ReactNode } from "react";
import type { KeyFigure as KeyFigureData } from "@/lib/content/types";
import { KeyFigure } from "@/components/ui/KeyFigure";

export function StatBlock({ figures }: { figures: KeyFigureData[] }): ReactNode {
  return (
    <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {figures.map((figure) => (
        <div key={figure.id}>
          <dt className="sr-only">{figure.label_en}</dt>
          <dd>
            <KeyFigure figure={figure} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
