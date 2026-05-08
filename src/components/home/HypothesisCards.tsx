"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const cards: { eyebrow: string; title: string; body: string }[] = [
  {
    eyebrow: "01 — The microbiome shift",
    title: "Infant gut microbiomes have changed.",
    body: "Across high-income countries over the past few decades, the bacterial communities seeded in childhood look measurably different from those of earlier generations.",
  },
  {
    eyebrow: "02 — The mutagenic agent",
    title: "Some bacteria edit our DNA.",
    body: "Certain strains — notably pks⁺ E. coli — produce mutagens (the bacterial toxin colibactin) that physically damage colorectal DNA.",
  },
  {
    eyebrow: "03 — The molecular fingerprint",
    title: "Each mutagen leaves a permanent signature.",
    body: "These DNA-damage events imprint a distinct, persistent pattern of mutations — a mutational signature — that we can read decades later in the cancer genome.",
  },
  {
    eyebrow: "04 — The temporal accumulation",
    title: "Signatures accumulate over decades.",
    body: "As these fingerprints build up, they ultimately drive the rising incidence of early-onset colorectal cancer we observe today.",
  },
];

function HypothesisCard({
  index,
  eyebrow,
  title,
  body,
  reducedMotion,
}: {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  reducedMotion: boolean;
}): ReactNode {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const visible = reducedMotion || inView;

  return (
    <motion.li
      animate={
        reducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: visible ? 1 : 0, y: visible ? 0 : 16 }
      }
      className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      ref={ref}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: reducedMotion ? 0 : index * 0.1,
      }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[var(--ecce-color-ink-high)]">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-[var(--ecce-color-ink-mid)]">{body}</p>
    </motion.li>
  );
}

export function HypothesisCards(): ReactNode {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {cards.map((card, i) => (
        <HypothesisCard
          body={card.body}
          eyebrow={card.eyebrow}
          index={i}
          key={card.title}
          reducedMotion={reducedMotion}
          title={card.title}
        />
      ))}
    </ol>
  );
}
