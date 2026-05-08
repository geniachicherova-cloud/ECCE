import type { ReactNode } from "react";
import { ButtonLink, SectionHeader } from "@/components/ui";

const FUNDERS = [
  { name: "European Research Council", short: "ERC" },
  { name: "International Agency for Research on Cancer · World Health Organization", short: "IARC / WHO" },
  { name: "Wellcome Sanger Institute", short: "Sanger" },
  { name: "University of California, San Diego", short: "UC San Diego" },
] as const;

function buildStamp(): string {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function CTAAct(): ReactNode {
  const lastUpdated = buildStamp();

  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-t border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)]"
      data-act="10"
      id="contact-cta"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-24">
        <div>
          <SectionHeader
            eyebrow="Get involved"
            lead="ECCE shares its data, methods, and findings under an open-science mandate. Reach the team for collaboration enquiries, or read how we publish."
            title="Work with us. Read with us. Build with us."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="mailto:brennanp@iarc.who.int">Contact the team</ButtonLink>
            <ButtonLink href="/open-science" variant="secondary">
              Read our open-science policy
            </ButtonLink>
          </div>

          <p className="mt-10 max-w-2xl text-[var(--ecce-color-ink-mid)]" id="cta-title">
            ECCE publishes peer-reviewed work, releases harmonised data through controlled-access mechanisms, and
            shares methodology openly. Capacity-building with partner countries — particularly across Africa, Asia,
            and South America — is a non-negotiable element of the consortium&rsquo;s work.
          </p>
        </div>

        <aside className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-base)] p-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
            Funded by · supported by
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-4">
            {FUNDERS.map((funder) => (
              <li
                className="flex min-h-20 items-center justify-center rounded-[var(--ecce-radius-md)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] px-4 py-3 text-center"
                data-pending="logo-rights"
                key={funder.short}
              >
                <span className="font-serif text-base font-semibold text-[var(--ecce-color-ink-mid)]">
                  {funder.short}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
            Wordmarks shown until approved logo files are confirmed.
          </p>
          <hr className="my-5 border-[var(--ecce-color-line-subtle)]" />
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
                Last updated
              </dt>
              <dd className="mt-1 text-[var(--ecce-color-ink-high)]">{lastUpdated}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
                Coordinator
              </dt>
              <dd className="mt-1 text-[var(--ecce-color-ink-high)]">IARC · Lyon</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
