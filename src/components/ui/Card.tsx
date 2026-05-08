import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  href?: string;
  children: ReactNode;
};

const cardClass =
  "block rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-surface)] p-6 text-left shadow-[var(--ecce-shadow-card-rest)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--ecce-shadow-card-hover)]";

export function Card({ className, href, children, ...props }: CardProps): ReactNode {
  if (href) {
    return (
      <article {...props}>
        <Link className={cn(cardClass, "no-underline", className)} href={href}>
          {children}
        </Link>
      </article>
    );
  }

  return (
    <article className={cn(cardClass, className)} {...props}>
      {children}
    </article>
  );
}
