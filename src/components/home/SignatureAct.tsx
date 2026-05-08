import type { ReactNode } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { SignatureHeatmapLazy } from "./SignatureHeatmap.client";

export function SignatureAct(): ReactNode {
  return (
    <section
      aria-labelledby="signature-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="4"
      id="signatures"
    >
      <SectionHeader
        eyebrow="Mutational signatures"
        lead="Across 96 trinucleotide contexts, every mutagen leaves a distinct relative-frequency profile. SBS88 is the signature attributed to colibactin — a toxin produced by certain pks⁺ E. coli strains."
        title="Reading the molecular fingerprints of DNA damage."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 text-[var(--ecce-color-ink-mid)]">
          <p className="font-serif text-2xl leading-snug text-[var(--ecce-color-ink-high)]">
            One sentence: a mutational signature is a fingerprint that tells us which mutagen damaged the DNA.
          </p>
          <p>
            One paragraph: when a mutagen damages DNA, repair machinery doesn&apos;t always return the sequence to its original
            state. The pattern of edits it leaves — across the 96 possible single-base substitutions in their three-letter
            sequence context — is reproducible. Decades later, by reading a tumour genome, we can recover that fingerprint
            and infer which exposures shaped its history.
          </p>
          <p>
            <Link
              className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]"
              href="/research/wp2-genomics#signatures"
            >
              Read the deeper explainer →
            </Link>
          </p>
        </div>

        <div className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6">
          <p
            className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]"
            id="signature-title"
          >
            SBS88 · 96-channel profile
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[var(--ecce-color-ink-high)]">
            Six substitution classes, sixteen contexts each.
          </h3>
          <div className="mt-6">
            <SignatureHeatmapLazy />
          </div>
        </div>
      </div>
    </section>
  );
}
