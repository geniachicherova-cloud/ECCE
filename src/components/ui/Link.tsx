import type { AnchorHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils/cn";

export function TextLink({
  className,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }): ReactNode {
  const classes = cn("text-[var(--ecce-color-accent-signal)] underline-offset-4 hover:text-[var(--ecce-color-accent-amber)] hover:underline", className);

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink className={classes} href={href} {...props}>
      {children}
    </NextLink>
  );
}
