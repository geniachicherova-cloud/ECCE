import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { CTA, Quote, SectionHeader, StatBlock } from "@/components/ui";
import keyFiguresData from "../../../content/data/key-figures.json";
import type { KeyFigure } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "About ECCE",
  description: "About the ECCE ERC Synergy project, hypothesis, governance, and open-science approach.",
};

export default function AboutPage(): ReactNode {
  const figures = (keyFiguresData.figures as KeyFigure[]).filter((figure) => figure.showOn?.includes("/about"));

  return (
    <PageShell>
      <SectionHeader
        eyebrow="About ECCE"
        title="Testing a microbiome and mutational-signature hypothesis at global scale."
        lead="ECCE brings together epidemiology, cancer genomics, microbiome research, and computational modelling to study still-unknown origins of colorectal cancer."
      />
      <div className="mt-10">
        <StatBlock figures={figures.slice(0, 4)} />
      </div>
      <section className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1fr]">
        <Quote cite="ECCE working hypothesis, source document">
          Based on convergent lines of evidence, ECCE hypothesises that microbiome-derived mutagens may contribute to rising early-onset colorectal cancer.
        </Quote>
        <div className="space-y-5 text-lg leading-relaxed text-[var(--ecce-color-ink-mid)]">
          <p>
            The project coordinates large-scale cancer epidemiology, cancer genomics, bioinformatics, microbiome research, and consortium management across five work packages.
          </p>
          <p>
            This prototype keeps the governance model intentionally simple: content lives in repository MDX files, public numbers live in a validated JSON file, and every page can be exported as static HTML.
          </p>
        </div>
      </section>
      <div className="mt-16">
        <CTA
          body="ECCE welcomes scientifically aligned collaborations through the project team."
          href="/contact"
          label="Contact ECCE"
          title="Collaborate with the consortium"
        />
      </div>
    </PageShell>
  );
}
