import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tone = "default" | "region" | "wp" | "signal" | "amber";

const tones: Record<Tone, string> = {
  default: "border-[var(--ecce-color-line-default)] text-[var(--ecce-color-ink-mid)]",
  region: "border-[rgba(63,224,197,0.4)] bg-[rgba(63,224,197,0.08)] text-[var(--ecce-color-accent-signal)]",
  wp: "border-[rgba(240,184,110,0.4)] bg-[rgba(240,184,110,0.06)] text-[var(--ecce-color-accent-amber)]",
  signal: "border-[rgba(63,224,197,0.4)] text-[var(--ecce-color-accent-signal)]",
  amber: "border-[rgba(240,184,110,0.4)] text-[var(--ecce-color-accent-amber)]",
};

export function Tag({
  className,
  tone = "default",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; children: ReactNode }): ReactNode {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--ecce-radius-pill)] border px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
