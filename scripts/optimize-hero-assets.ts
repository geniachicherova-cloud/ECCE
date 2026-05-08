import { readdir, readFile, unlink, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const HERO_DIR = join(process.cwd(), "public", "assets", "img", "hero");
const MAX_WIDTH = 1920;
const TARGET_AVIF_BYTES = 200 * 1024;

async function fileSize(path: string): Promise<number> {
  const s = await stat(path);
  return s.size;
}

async function exportAvif(input: Buffer, outPath: string, quality: number): Promise<number> {
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .avif({ quality, effort: 6 })
    .toFile(outPath);
  return fileSize(outPath);
}

async function exportWebp(input: Buffer, outPath: string, quality = 80): Promise<number> {
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  return fileSize(outPath);
}

async function main(): Promise<void> {
  const entries = await readdir(HERO_DIR);
  const pngs = entries.filter((name) => name.toLowerCase().endsWith(".png"));

  if (pngs.length === 0) {
    console.log("No PNG hero assets found — nothing to optimise.");
    return;
  }

  for (const png of pngs) {
    const fullPath = join(HERO_DIR, png);
    const { name } = parse(png);
    const buffer = await readFile(fullPath);

    const avifPath = join(HERO_DIR, `${name}.avif`);
    const webpPath = join(HERO_DIR, `${name}.webp`);

    let avifSize = await exportAvif(buffer, avifPath, 60);
    if (avifSize > TARGET_AVIF_BYTES) {
      console.log(
        `  ${name}.avif at q60 was ${(avifSize / 1024).toFixed(0)}KB (>200KB) — re-exporting at q50.`,
      );
      avifSize = await exportAvif(buffer, avifPath, 50);
    }

    const webpSize = await exportWebp(buffer, webpPath, 80);

    console.log(
      `${name}: avif ${(avifSize / 1024).toFixed(0)}KB · webp ${(webpSize / 1024).toFixed(0)}KB`,
    );

    await unlink(fullPath);
  }

  console.log(`Optimised ${pngs.length} hero assets. Original PNGs removed.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
