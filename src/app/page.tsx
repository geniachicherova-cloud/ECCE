import type { ReactNode } from "react";
import keyFiguresData from "../../content/data/key-figures.json";
import { ButtonLink, Card, Quote, SectionHeader, StatBlock, Tag } from "@/components/ui";
import type { KeyFigure as KeyFigureData } from "@/lib/content/types";

type KeyFiguresFile = {
  figures: KeyFigureData[];
};

const keyFigures = (keyFiguresData as KeyFiguresFile).figures.filter(
  (figure) => figure.isPublic !== false && figure.showOn?.includes("/"),
);

export default function Home(): ReactNode {
  return (
    <main id="main">
      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-[1440px] items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.8fr] lg:px-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
            ERC Synergy · IARC · Sanger · UC San Diego
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-[var(--ecce-color-ink-high)] sm:text-7xl">
            Decoding the molecular origins of colorectal cancer.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--ecce-color-ink-mid)]">
            A static-export prototype foundation for the ECCE consortium website, ready for Gate 5 review.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/research">Explore the science</ButtonLink>
            <ButtonLink href="/team" variant="secondary">Meet the team</ButtonLink>
          </div>
        </div>
        <Card>
          <div className="flex flex-wrap gap-2">
            <Tag tone="region">5 continents</Tag>
            <Tag tone="wp">5 work packages</Tag>
          </div>
          <Quote className="mt-8" cite="ECCE working hypothesis, source document">
            ECCE tests whether microbiome-derived mutational processes may help explain the rise of early-onset colorectal cancer.
          </Quote>
        </Card>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24">
        <SectionHeader
          eyebrow="Key figures"
          title="Every public number carries a source, owner, and date."
          lead="The foundation wires the key-figures data contract now, before the homepage narrative is built."
        />
        <div className="mt-10">
          <StatBlock figures={keyFigures.slice(0, 4)} />
        </div>
      </section>
    </main>
  );
}
