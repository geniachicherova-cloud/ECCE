import type { ReactNode } from "react";

export function Footnote({ id, children }: { id: string; children: ReactNode }): ReactNode {
  return (
    <p className="text-sm leading-relaxed text-[var(--ecce-color-ink-mid)]" id={id}>
      <a className="font-mono text-[var(--ecce-color-accent-signal)]" href={`#ref-${id}`}>
        {id}
      </a>{" "}
      {children}
    </p>
  );
}
