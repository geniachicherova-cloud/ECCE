import type { ReactNode } from "react";
import Link from "next/link";

export function Footer(): ReactNode {
  return (
    <footer className="border-t border-[var(--ecce-color-line-subtle)] px-5 py-12 text-sm text-[var(--ecce-color-ink-mid)] lg:px-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-4">
        <div>
          <div className="font-serif text-xl font-semibold text-[var(--ecce-color-ink-high)]">ECCE</div>
          <p className="mt-3">ERC Synergy colorectal cancer research prototype.</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">Explore</h2>
          <ul className="mt-3 space-y-2">
            <li><Link href="/about">About ECCE</Link></li>
            <li><Link href="/research">Research</Link></li>
            <li><Link href="/partner-institutes">Partner institutes</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">Contact</h2>
          <p className="mt-3">International Agency for Research on Cancer, Lyon, France</p>
          <p className="mt-2">brennanp@iarc.who.int<br />chicherovai@iarc.who.int</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">Funded by</h2>
          <p className="mt-3">ERC Synergy Grant · IARC/WHO · Wellcome Sanger Institute · UC San Diego</p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[var(--ecce-color-line-subtle)] pt-6">
        <span>Prototype only. No public deployment.</span>
        <span className="font-mono text-xs uppercase tracking-[0.08em]">EN active · FR/ES placeholders</span>
      </div>
    </footer>
  );
}
