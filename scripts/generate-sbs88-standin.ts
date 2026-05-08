import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const SUBSTITUTIONS = ["C>A", "C>G", "C>T", "T>A", "T>C", "T>G"] as const;
const BASES = ["A", "C", "G", "T"] as const;

type Channel = {
  substitution: (typeof SUBSTITUTIONS)[number];
  trinucleotide: string;
  frequency: number;
};

const channels: Channel[] = [];

for (const sub of SUBSTITUTIONS) {
  const ref = sub[0];
  for (const fivePrime of BASES) {
    for (const threePrime of BASES) {
      const trinucleotide = `${fivePrime}${ref}${threePrime}`;
      let frequency = 0.006;
      if (sub === "T>A" || sub === "T>C") {
        if (threePrime === "A" || threePrime === "T") {
          frequency = 0.022;
          if (fivePrime === "A" || fivePrime === "T") {
            frequency = 0.04;
          }
        }
      }
      const jitter = (Math.sin(channels.length * 1.7) + 1) * 0.0015;
      channels.push({
        substitution: sub,
        trinucleotide,
        frequency: Number((frequency + jitter).toFixed(5)),
      });
    }
  }
}

const total = channels.reduce((acc, c) => acc + c.frequency, 0);
for (const channel of channels) {
  channel.frequency = Number((channel.frequency / total).toFixed(5));
}

const output = {
  signature: "SBS88",
  description: "COSMIC v3 mutational signature attributed to colibactin exposure (pks+ E. coli).",
  asOf: "2026-05-08",
  owner: "ECCE WP2 — pending replacement with canonical COSMIC v3.4 export",
  source: { label: "COSMIC v3.4 SBS88", url: "https://cancer.sanger.ac.uk/signatures/sbs/sbs88/" },
  notes:
    "[STAND-IN] Representative shape only. The 96-channel structure is correct, frequencies are illustrative and biased toward the T>N enrichment associated with SBS88 — they are not the canonical COSMIC values. Replace with the official sbs88 export before publish.",
  channels,
};

async function main(): Promise<void> {
  const path = join(process.cwd(), "content", "data", "sbs88.json");
  await writeFile(path, JSON.stringify(output, null, 2));
  console.log(`Wrote ${channels.length} channels to ${path}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
