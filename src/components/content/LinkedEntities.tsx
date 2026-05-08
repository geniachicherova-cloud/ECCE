import type { ReactNode } from "react";
import { ButtonLink, Tag } from "@/components/ui";

export function LinkedEntities({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string; meta?: string }>;
}): ReactNode {
  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--ecce-color-line-subtle)] pt-8">
      <h2 className="font-serif text-3xl font-semibold">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            className="flex items-center justify-between gap-4 rounded-[var(--ecce-radius-md)] border border-[var(--ecce-color-line-subtle)] p-4"
            key={item.href}
          >
            <div>
              <div className="font-semibold">{item.label}</div>
              {item.meta ? (
                <div className="mt-1">
                  <Tag>{item.meta}</Tag>
                </div>
              ) : null}
            </div>
            <ButtonLink href={item.href} variant="tertiary">
              View
            </ButtonLink>
          </div>
        ))}
      </div>
    </section>
  );
}
