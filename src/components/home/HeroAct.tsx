import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import { allInstitutes } from "@/lib/content/collections";
import { HeroGlobeMount } from "./HeroGlobeMount";

export function HeroAct(): ReactNode {
  const coordinates = allInstitutes.map((institute) => institute.coordinates);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      data-act="1"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <picture>
          <source
            srcSet="/assets/img/hero/genomic-topography.avif"
            type="image/avif"
          />
          <source
            srcSet="/assets/img/hero/genomic-topography.webp"
            type="image/webp"
          />
          <img
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-50"
            decoding="async"
            fetchPriority="high"
            src="/assets/img/hero/genomic-topography.webp"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,26,0.45)] via-[rgba(10,14,26,0.65)] to-[var(--ecce-color-background-base)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-[1440px] items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.8fr] lg:px-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-accent-signal)]">
            ERC Synergy · IARC · Sanger · UC San Diego
          </p>
          <h1
            className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-[var(--ecce-color-ink-high)] sm:text-7xl"
            id="hero-title"
          >
            Decoding the molecular origins of colorectal cancer.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[var(--ecce-color-ink-mid)]">
            An ERC Synergy project investigating early-onset cancer through 12,400 genomes across 35 global institutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/research">Explore the science</ButtonLink>
            <ButtonLink href="/team" variant="secondary">
              Meet the team
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[480px] justify-self-center lg:justify-self-end">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(63,224,197,0.18),rgba(10,14,26,0)_70%)]" />
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-70"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              fill="none"
              r="92"
              stroke="rgba(63,224,197,0.25)"
              strokeWidth="0.6"
            />
            <ellipse
              cx="100"
              cy="100"
              fill="none"
              rx="92"
              ry="40"
              stroke="rgba(63,224,197,0.18)"
              strokeWidth="0.5"
            />
            <ellipse
              cx="100"
              cy="100"
              fill="none"
              rx="40"
              ry="92"
              stroke="rgba(63,224,197,0.18)"
              strokeWidth="0.5"
            />
            {coordinates.map(([lng, lat], i) => {
              const phi = (90 - lat) * (Math.PI / 180);
              const theta = (lng + 180) * (Math.PI / 180);
              const x = 100 + 92 * Math.sin(phi) * Math.cos(theta);
              const y = 100 - 92 * Math.cos(phi);
              return (
                <circle
                  cx={x}
                  cy={y}
                  fill="#3FE0C5"
                  key={i}
                  opacity="0.85"
                  r="1.4"
                />
              );
            })}
          </svg>
          <HeroGlobeMount coordinates={coordinates} />
        </div>
      </div>
    </section>
  );
}
