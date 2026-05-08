import type { ReactNode } from "react";
import Image from "next/image";
import type { AssetRef } from "@/lib/content/types";

export function MediaFigure({ asset, caption }: { asset: AssetRef; caption?: string }): ReactNode {
  return (
    <figure>
      <Image
        alt={asset.alt_en}
        className="h-auto w-full rounded-[var(--ecce-radius-lg)] border border-[var(--ecce-color-line-subtle)]"
        height={asset.height ?? 900}
        src={asset.src}
        width={asset.width ?? 1200}
      />
      {caption || asset.credit ? (
        <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-low)]">
          {caption}
          {asset.credit ? ` Credit: ${asset.credit}.` : ""}
        </figcaption>
      ) : null}
    </figure>
  );
}
