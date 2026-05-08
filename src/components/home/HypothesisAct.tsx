import type { ReactNode } from "react";
import { Quote, SectionHeader } from "@/components/ui";
import { HypothesisCardsLazy } from "./HypothesisCards.client";

export function HypothesisAct(): ReactNode {
  return (
    <section
      aria-labelledby="hypothesis-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="3"
      id="hypothesis"
    >
      <SectionHeader
        eyebrow="The hypothesis"
        lead="ECCE's working hypothesis follows a four-step causal chain — from the microbiome a child carries, to the mutagens it produces, to the molecular signatures it leaves, to the cancers we see decades later."
        title="From a changed microbiome to a changed genome."
      />

      <div className="mt-12">
        <HypothesisCardsLazy />
      </div>

      <div className="mt-12 max-w-3xl" id="hypothesis-title">
        <Quote cite="ECCE working hypothesis">
          ECCE tests whether shifts in the early-life microbiome — and the mutagenic byproducts of specific bacterial strains — leave persistent mutational signatures in the colorectal genome that, accumulated across a lifetime, help explain the global rise in early-onset colorectal cancer.
        </Quote>
      </div>
    </section>
  );
}
