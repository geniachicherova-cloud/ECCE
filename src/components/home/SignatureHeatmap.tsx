"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import sbs88 from "../../../content/data/sbs88.json";

type Channel = {
  substitution: string;
  trinucleotide: string;
  frequency: number;
};

type Signature = {
  signature: string;
  channels: Channel[];
};

const data = sbs88 as Signature;

const SUBSTITUTIONS = ["C>A", "C>G", "C>T", "T>A", "T>C", "T>G"] as const;

const SUB_COLORS: Record<string, string> = {
  "C>A": "#3FE0C5",
  "C>G": "#000000",
  "C>T": "#E8694F",
  "T>A": "#A2ADC0",
  "T>C": "#7A9CFF",
  "T>G": "#F0B86E",
};

function groupBySubstitution(channels: Channel[]): Record<string, Channel[]> {
  const map: Record<string, Channel[]> = {};
  for (const sub of SUBSTITUTIONS) map[sub] = [];
  for (const ch of channels) {
    map[ch.substitution]?.push(ch);
  }
  for (const sub of SUBSTITUTIONS) {
    map[sub].sort((a, b) => a.trinucleotide.localeCompare(b.trinucleotide));
  }
  return map;
}

export function SignatureHeatmap(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{ index: number; x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 720, height: 220 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const grouped = useMemo(() => groupBySubstitution(data.channels), []);
  const orderedChannels = useMemo(
    () => SUBSTITUTIONS.flatMap((sub) => grouped[sub]),
    [grouped],
  );
  const maxFrequency = useMemo(
    () => Math.max(...orderedChannels.map((c) => c.frequency)),
    [orderedChannels],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    setIsCoarsePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setIsCoarsePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setSize({ width, height: Math.min(260, Math.max(180, width * 0.32)) });
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size.width, size.height);

    const paddingLeft = 36;
    const paddingRight = 12;
    const paddingTop = 28;
    const paddingBottom = 28;
    const plotWidth = size.width - paddingLeft - paddingRight;
    const plotHeight = size.height - paddingTop - paddingBottom;
    const groupGap = 6;
    const groups = SUBSTITUTIONS.length;
    const groupWidth = (plotWidth - groupGap * (groups - 1)) / groups;
    const barWidth = groupWidth / 16;

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "10px var(--ecce-typography-family-mono), monospace";
    ctx.textAlign = "right";
    [0, 0.5, 1].forEach((tick) => {
      const y = paddingTop + plotHeight - tick * plotHeight;
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(size.width - paddingRight, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText((tick * maxFrequency).toFixed(3), paddingLeft - 6, y + 3);
    });

    SUBSTITUTIONS.forEach((sub, gi) => {
      const groupX = paddingLeft + gi * (groupWidth + groupGap);
      ctx.fillStyle = SUB_COLORS[sub] ?? "#3FE0C5";
      ctx.fillRect(groupX, paddingTop - 14, groupWidth, 4);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.textAlign = "center";
      ctx.fillText(sub, groupX + groupWidth / 2, paddingTop - 18);

      const groupChannels = grouped[sub];
      groupChannels.forEach((channel, ci) => {
        const globalIndex = orderedChannels.indexOf(channel);
        const x = groupX + ci * barWidth;
        const ratio = channel.frequency / maxFrequency;
        const barHeight = ratio * plotHeight;
        const y = paddingTop + plotHeight - barHeight;
        const isHover = hover?.index === globalIndex;
        ctx.fillStyle = SUB_COLORS[sub] ?? "#3FE0C5";
        ctx.globalAlpha = isHover ? 1 : 0.85;
        ctx.fillRect(x + 1, y, Math.max(barWidth - 2, 1), barHeight);
        ctx.globalAlpha = 1;
      });
    });
  }, [grouped, hover, maxFrequency, orderedChannels, size]);

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const paddingLeft = 36;
    const paddingRight = 12;
    const plotWidth = size.width - paddingLeft - paddingRight;
    const groupGap = 6;
    const groups = SUBSTITUTIONS.length;
    const groupWidth = (plotWidth - groupGap * (groups - 1)) / groups;
    const barWidth = groupWidth / 16;
    const groupIndex = Math.floor((x - paddingLeft) / (groupWidth + groupGap));

    if (groupIndex < 0 || groupIndex >= groups) {
      setHover(null);
      return;
    }
    const groupX = paddingLeft + groupIndex * (groupWidth + groupGap);
    const inside = x - groupX;
    if (inside < 0 || inside > groupWidth) {
      setHover(null);
      return;
    }
    const channelIndex = Math.floor(inside / barWidth);
    if (channelIndex < 0 || channelIndex > 15) {
      setHover(null);
      return;
    }
    const sub = SUBSTITUTIONS[groupIndex];
    const channel = grouped[sub][channelIndex];
    const globalIndex = orderedChannels.indexOf(channel);
    setHover({ index: globalIndex, x, y });
  };

  const hovered = hover ? orderedChannels[hover.index] : null;

  return (
    <div className="relative" ref={wrapperRef}>
      <canvas
        aria-label={`SBS88 mutational signature: 96-channel relative-frequency profile across six substitution classes — ${SUBSTITUTIONS.join(", ")}.`}
        className="block w-full"
        onPointerLeave={() => setHover(null)}
        onPointerMove={handlePointerMove}
        ref={canvasRef}
        role="img"
      />
      {hovered ? (
        <div
          className="pointer-events-none absolute z-10 rounded-[var(--ecce-radius-sm)] border border-[var(--ecce-color-line-default)] bg-[var(--ecce-color-background-elevated)] px-3 py-2 font-mono text-xs text-[var(--ecce-color-ink-high)] shadow-[var(--ecce-shadow-card-hover)]"
          style={{
            left: Math.min(size.width - 160, (hover?.x ?? 0) + 12),
            top: Math.max(0, (hover?.y ?? 0) - 48),
          }}
        >
          <p>
            <span style={{ color: SUB_COLORS[hovered.substitution] }}>{hovered.substitution}</span>
            {" "}
            in {hovered.trinucleotide.replace(hovered.substitution[0], `[${hovered.substitution[0]}]`)}
          </p>
          <p className="mt-1 text-[var(--ecce-color-ink-mid)]">
            relative frequency {hovered.frequency.toFixed(4)}
          </p>
        </div>
      ) : null}
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
        [STAND-IN] {isCoarsePointer ? "Tap a column to inspect" : "Hover any column for the trinucleotide context"}
      </p>
    </div>
  );
}
