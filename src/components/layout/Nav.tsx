import type { ReactNode } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

const navItems = [
  ["Home", "/"],
  ["About ECCE", "/about"],
  ["Research", "/research"],
  ["CRC Worldwide", "/colorectal-cancer"],
  ["Team", "/team"],
  ["Partner Institutes", "/partner-institutes"],
  ["News & Insights", "/news"],
  ["Contact", "/contact"],
] as const;

export function Nav(): ReactNode {
  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--ecce-color-line-subtle)] bg-[rgba(10,14,26,0.72)] backdrop-blur-md">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[1000] focus:rounded-md focus:bg-[var(--ecce-color-accent-signal)] focus:px-4 focus:py-2 focus:text-[#06281f]"
        href="#main"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 lg:px-24">
        <Link className="font-serif text-xl font-semibold no-underline" href="/">
          ECCE
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {navItems.map(([label, href]) => (
            <li key={href}>
              <Link className="text-sm font-medium text-[var(--ecce-color-ink-mid)] no-underline hover:text-[var(--ecce-color-ink-high)]" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink className="hidden lg:inline-flex" href="/contact" variant="secondary">
          Collaborate with us
        </ButtonLink>
      </nav>
    </header>
  );
}
