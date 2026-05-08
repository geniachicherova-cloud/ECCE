import type { BlockquoteHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Quote({
  children,
  cite,
  className,
  ...props
}: BlockquoteHTMLAttributes<HTMLQuoteElement> & { children: ReactNode; cite?: string }): ReactNode {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-[var(--ecce-color-accent-amber)] pl-6 font-serif text-2xl leading-snug text-[var(--ecce-color-ink-high)]",
        className,
      )}
      {...props}
    >
      <p>{children}</p>
      {cite ? <footer className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-low)]">{cite}</footer> : null}
    </blockquote>
  );
}
