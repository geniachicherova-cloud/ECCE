import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "tertiary";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-[var(--ecce-color-accent-signal)] !text-[#06281f] hover:bg-[var(--ecce-color-accent-signal-deep)] hover:!text-[var(--ecce-color-ink-high)]",
  secondary:
    "border-[var(--ecce-color-line-strong)] bg-transparent text-[var(--ecce-color-ink-high)] hover:border-[var(--ecce-color-accent-amber)] hover:bg-[rgba(240,184,110,0.12)] hover:text-[var(--ecce-color-accent-amber)]",
  tertiary:
    "border-transparent bg-transparent px-1 text-[var(--ecce-color-accent-signal)] hover:text-[var(--ecce-color-accent-amber)] hover:underline hover:underline-offset-4",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--ecce-radius-md)] border px-5 py-3 font-semibold no-underline transition-colors duration-200";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps): ReactNode {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  children,
  href,
  ...props
}: ButtonLinkProps): ReactNode {
  const content = (
    <>
      {children}
      {variant !== "secondary" ? <ArrowRight aria-hidden size={16} strokeWidth={1.8} /> : null}
    </>
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={cn(base, variants[variant], className)} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link className={cn(base, variants[variant], className)} href={href} {...props}>
      {content}
    </Link>
  );
}
