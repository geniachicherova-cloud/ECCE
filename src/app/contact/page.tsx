import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink, Card, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ECCE project leadership at IARC.",
};

export default function ContactPage(): ReactNode {
  const mailto =
    "mailto:brennanp@iarc.who.int,chicherovai@iarc.who.int?subject=ECCE%20collaboration%20enquiry";

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Contact"
        title="Collaborations and project enquiries"
        lead="The v1 prototype uses a static mailto workflow to stay compatible with full static export."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-serif text-3xl font-semibold">Email the project team</h2>
          <p className="mt-4 text-[var(--ecce-color-ink-mid)]">
            For queries or interest in collaborations, please email Dr Brennan or Dr Chicherova.
          </p>
          <div className="mt-6">
            <ButtonLink href={mailto}>Open email</ButtonLink>
          </div>
        </Card>
        <Card>
          <h2 className="font-serif text-3xl font-semibold">IARC address</h2>
          <p className="mt-4 text-[var(--ecce-color-ink-mid)]">
            International Agency for Research on Cancer
            <br />
            25 avenue Tony Garnier
            <br />
            CS 90627
            <br />
            69366 Lyon Cedex 07, France
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
