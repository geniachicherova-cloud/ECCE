import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

export function CTA({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}): ReactNode {
  return (
    <section className="border-y border-[var(--ecce-color-line-subtle)] py-16">
      <div className="max-w-4xl">
        <h2 className="font-serif text-4xl font-semibold leading-tight">{title}</h2>
        <p className="mt-5 max-w-2xl text-lg text-[var(--ecce-color-ink-mid)]">{body}</p>
        <div className="mt-8">
          <ButtonLink href={href}>{label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
