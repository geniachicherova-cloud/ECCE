import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}): ReactNode {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--ecce-color-ink-high)] sm:text-5xl">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-xl leading-relaxed text-[var(--ecce-color-ink-mid)]">{lead}</p> : null}
    </header>
  );
}
