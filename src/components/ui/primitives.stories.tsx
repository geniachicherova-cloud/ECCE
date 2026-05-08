import type { ReactNode } from "react";
import { Button, ButtonLink, Card, CTA, KeyFigure, Quote, RegionBadge, SectionHeader, Tag, WPBadge } from "@/components/ui";
import type { KeyFigure as KeyFigureData } from "@/lib/content/types";

const figure: KeyFigureData = {
  id: "partner_institutes",
  label_en: "Partner institutes",
  value: 36,
  unit: null,
  display: "exact",
  asOf: "2026-05-08",
  source: { label: "ECCE consortium register" },
  owner: "Genia Chicherova, IARC",
};

export function Buttons(): ReactNode {
  return (
    <div className="flex flex-wrap gap-3 bg-[var(--ecce-color-background-base)] p-8">
      <Button>Primary action</Button>
      <Button variant="secondary">Secondary</Button>
      <ButtonLink href="/research" variant="tertiary">Tertiary link</ButtonLink>
    </div>
  );
}

export function CardsAndBadges(): ReactNode {
  return (
    <div className="bg-[var(--ecce-color-background-base)] p-8">
      <Card className="max-w-md">
        <div className="mb-4 flex gap-2">
          <RegionBadge region="europe" />
          <WPBadge wp="wp2" />
          <Tag>Core institution</Tag>
        </div>
        <h2 className="font-serif text-2xl font-semibold">Wellcome Sanger Institute</h2>
        <p className="mt-2 text-[var(--ecce-color-ink-mid)]">Cambridge, United Kingdom</p>
      </Card>
    </div>
  );
}

export function FiguresAndQuote(): ReactNode {
  return (
    <div className="grid gap-8 bg-[var(--ecce-color-background-base)] p-8">
      <KeyFigure figure={figure} />
      <Quote cite="ECCE prototype">
        Mutational signatures act like molecular fingerprints, helping researchers study how cancer develops.
      </Quote>
    </div>
  );
}

export function SectionAndCta(): ReactNode {
  return (
    <div className="bg-[var(--ecce-color-background-base)] p-8">
      <SectionHeader
        eyebrow="Design system"
        title="Scientific, restrained, and ready for content."
        lead="The primitives use the token contract and remain compatible with static export."
      />
      <div className="mt-10">
        <CTA body="Contact the project team through the static mailto workflow." href="/contact" label="Contact us" title="Collaborate with ECCE" />
      </div>
    </div>
  );
}
