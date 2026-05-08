import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footnote, SectionHeader } from "@/components/ui";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Colorectal Cancer Worldwide",
  description: "A public-facing explainer on colorectal cancer and early-onset colorectal cancer trends.",
};

export default function ColorectalCancerPage(): ReactNode {
  return (
    <PageShell>
      <article className="rounded-[var(--ecce-radius-lg)] bg-[var(--ecce-color-paper-base)] p-8 text-[var(--ecce-color-paper-ink-high)] lg:p-14">
        <SectionHeader
          eyebrow="Colorectal cancer worldwide"
          title="A common cancer with changing patterns in younger adults."
          lead="This editorial page uses the paper variant for long-form readability and keeps geographically scoped language from the source document."
        />
        <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-[var(--ecce-color-ink-inverse-mid)]">
          <p>
            Colorectal cancer affects the colon and rectum and is one of the most common and lethal cancers worldwide, with striking geographical variation in incidence.
          </p>
          <p>
            Early-onset colorectal cancer, typically defined as colorectal cancer diagnosed before the age of 50, has emerged as a major public-health trend over recent decades. It is increasing across many high-income countries, including Europe, North America, and parts of Asia, while the underlying causes remain incompletely understood.
          </p>
          <p>
            Established risk factors include ageing, obesity, smoking, alcohol consumption, and dietary patterns. These factors do not fully explain the rapid and sustained rise observed in younger populations, which is why ECCE is testing additional environmental, microbial, and early-life hypotheses.
          </p>
        </div>
        <section className="mt-12 border-t border-black/10 pt-8">
          <h2 className="font-serif text-3xl font-semibold">References</h2>
          <div className="mt-5 space-y-3">
            <Footnote id="ref-1">IARC, Cancer Incidence in Five Continents, Volume XI.</Footnote>
            <Footnote id="ref-2">World Cancer Research Fund, data-specific cancer facts and figures.</Footnote>
            <Footnote id="ref-3">Downham et al., 2026, Journal of the National Cancer Institute.</Footnote>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
