import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui";

const lesionPositions = [
  { x: 120, t: 0.18, label: "AAA context — colibactin lesion" },
  { x: 260, t: 0.42, label: "TTT context — interstrand crosslink" },
  { x: 400, t: 0.65, label: "AAT context — adduct site" },
  { x: 540, t: 0.86, label: "ATA context — colibactin lesion" },
];

const HELIX_WIDTH = 720;
const HELIX_HEIGHT = 200;
const STRAND_AMPLITUDE = 38;
const STRAND_PERIOD = 110;
const RUNG_COUNT = 36;

function strandY(x: number, offset = 0): number {
  return HELIX_HEIGHT / 2 + Math.sin((x / STRAND_PERIOD) * Math.PI * 2 + offset) * STRAND_AMPLITUDE;
}

function buildPath(offset: number): string {
  const steps = 80;
  let path = "";
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * HELIX_WIDTH;
    const y = strandY(x, offset);
    path += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return path.trim();
}

export function MicrobiomeAct(): ReactNode {
  const strandTop = buildPath(0);
  const strandBottom = buildPath(Math.PI);

  return (
    <section
      aria-labelledby="microbiome-title"
      className="mx-auto max-w-[1440px] px-5 py-20 lg:px-24"
      data-act="5"
      id="microbiome"
    >
      <SectionHeader
        eyebrow="The microbiome connection"
        lead="Some of the bacteria that live in our gut don&rsquo;t just colonise the lining of the colon. They emit small molecules — like the colibactin toxin from pks⁺ E. coli — that physically alter the genome of the cells around them."
        title="Some bacteria don&rsquo;t just live in us. They edit us."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6 text-[var(--ecce-color-ink-mid)]">
          <p>
            Colibactin is a small-molecule genotoxin synthesised by certain strains of Escherichia coli. It crosslinks
            adjacent adenines on opposite strands of DNA, leaving lesions that — once repaired imperfectly — produce
            the SBS88 mutational signature.
          </p>
          <p>
            ECCE&rsquo;s microbiome work (WP3) profiles which strains are present, when they were acquired, and how their
            mutagenic output traces through to the genomes WP2 sequences. The annotated lesion sites at right show
            where colibactin tends to act on a colorectal DNA strand.
          </p>
        </div>

        <figure
          className="rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)] bg-[var(--ecce-color-background-elevated)] p-6"
          id="microbiome-title"
        >
          <svg
            aria-label="Schematic DNA double helix with four colibactin lesion sites highlighted across the strand. Each site corresponds to a trinucleotide context where colibactin tends to crosslink adjacent adenines."
            className="h-auto w-full"
            role="img"
            viewBox={`0 0 ${HELIX_WIDTH} ${HELIX_HEIGHT}`}
          >
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="strandGradient" x1="0" x2={HELIX_WIDTH} y1="0" y2="0">
                <stop offset="0" stopColor="rgba(63,224,197,0.2)" />
                <stop offset="0.5" stopColor="rgba(63,224,197,0.7)" />
                <stop offset="1" stopColor="rgba(63,224,197,0.2)" />
              </linearGradient>
            </defs>

            {Array.from({ length: RUNG_COUNT }, (_, i) => {
              const x = (i / (RUNG_COUNT - 1)) * HELIX_WIDTH;
              const y1 = strandY(x, 0);
              const y2 = strandY(x, Math.PI);
              return (
                <line
                  key={i}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  x1={x}
                  x2={x}
                  y1={y1}
                  y2={y2}
                />
              );
            })}

            <path
              d={strandTop}
              fill="none"
              stroke="url(#strandGradient)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <path
              d={strandBottom}
              fill="none"
              stroke="url(#strandGradient)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />

            {lesionPositions.map((lesion, i) => {
              const x = lesion.t * HELIX_WIDTH;
              const yTop = strandY(x, 0);
              const yBottom = strandY(x, Math.PI);
              return (
                <g className="[&:hover_.lesion-label]:opacity-100" key={i}>
                  <circle
                    cx={x}
                    cy={yTop}
                    fill="rgba(232,105,79,0.95)"
                    r="5"
                    stroke="rgba(232,105,79,0.4)"
                    strokeWidth="6"
                  />
                  <circle
                    cx={x}
                    cy={yBottom}
                    fill="rgba(232,105,79,0.95)"
                    r="5"
                    stroke="rgba(232,105,79,0.4)"
                    strokeWidth="6"
                  />
                  <line
                    stroke="rgba(232,105,79,0.5)"
                    strokeDasharray="2 3"
                    strokeWidth="1"
                    x1={x}
                    x2={x}
                    y1={yTop}
                    y2={yBottom}
                  />
                  <text
                    className="lesion-label opacity-70 transition-opacity"
                    fill="var(--ecce-color-ink-high)"
                    fontFamily="var(--ecce-typography-family-mono)"
                    fontSize="10"
                    textAnchor="middle"
                    x={x}
                    y={yTop - 18}
                  >
                    {lesion.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
            Annotated DNA strand with colibactin lesion sites (illustrative; AAW context is the canonical motif).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
