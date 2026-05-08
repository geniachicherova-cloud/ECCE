"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import incidence from "../../../content/data/eocrc-incidence.json";

const WIDTH = 720;
const HEIGHT = 360;
const MARGIN = { top: 24, right: 32, bottom: 44, left: 56 };

const seriesColors: Record<string, string> = {
  "high-income": "var(--ecce-color-data-viz-categorical-2)",
  transitioning: "var(--ecce-color-data-viz-categorical-1)",
};

type Point = { cohort: number; rateRatio: number };

type Series = {
  id: string;
  label: string;
  points: Point[];
};

const data = incidence as {
  series: Series[];
  unit: string;
  notes: string;
};

const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

const allPoints = data.series.flatMap((s) => s.points);
const xMin = Math.min(...allPoints.map((p) => p.cohort));
const xMax = Math.max(...allPoints.map((p) => p.cohort));
const yMax = Math.ceil(Math.max(...allPoints.map((p) => p.rateRatio)) * 10) / 10;

const xScale = scaleLinear<number>({
  domain: [xMin, xMax],
  range: [0, innerWidth],
});

const yScale = scaleLinear<number>({
  domain: [0, yMax + 0.2],
  range: [innerHeight, 0],
  nice: true,
});

export function EoCRCChart(): ReactNode {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef}>
      <figure>
        <svg
          aria-label="Line chart: early-onset colorectal cancer incidence rate ratios across birth cohorts from 1950 to 1990. Both high-income countries and transitioning economies show a steady upward rise."
          className="w-full"
          role="img"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
          <Group left={MARGIN.left} top={MARGIN.top}>
            {yScale.ticks(5).map((tick) => (
              <line
                key={`gridline-${tick}`}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="2,4"
                x1={0}
                x2={innerWidth}
                y1={yScale(tick)}
                y2={yScale(tick)}
              />
            ))}

            <AxisLeft
              numTicks={5}
              scale={yScale}
              stroke="rgba(255,255,255,0.28)"
              tickLabelProps={() => ({
                fill: "var(--ecce-color-ink-mid)",
                fontFamily: "var(--ecce-typography-family-mono)",
                fontSize: 11,
                textAnchor: "end",
                dx: -4,
                dy: 4,
              })}
              tickStroke="rgba(255,255,255,0.28)"
            />
            <AxisBottom
              numTicks={5}
              scale={xScale}
              stroke="rgba(255,255,255,0.28)"
              tickFormat={(value) => `${value}`}
              tickLabelProps={() => ({
                fill: "var(--ecce-color-ink-mid)",
                fontFamily: "var(--ecce-typography-family-mono)",
                fontSize: 11,
                textAnchor: "middle",
                dy: 4,
              })}
              tickStroke="rgba(255,255,255,0.28)"
              top={innerHeight}
            />

            {data.series.map((series) => (
              <LinePath<Point>
                data={series.points}
                key={series.id}
                stroke={seriesColors[series.id] ?? "var(--ecce-color-accent-signal)"}
                strokeDasharray="800"
                strokeDashoffset={revealed ? 0 : 800}
                strokeWidth={2}
                style={{
                  transition: reducedMotion
                    ? "none"
                    : "stroke-dashoffset var(--ecce-duration-scrub) var(--ecce-easing-out)",
                }}
                x={(d) => xScale(d.cohort) ?? 0}
                y={(d) => yScale(d.rateRatio) ?? 0}
              />
            ))}

            {data.series.map((series) =>
              series.points.map((point, i) => (
                <circle
                  cx={xScale(point.cohort)}
                  cy={yScale(point.rateRatio)}
                  fill={seriesColors[series.id] ?? "var(--ecce-color-accent-signal)"}
                  key={`${series.id}-${i}`}
                  opacity={revealed ? 0.85 : 0}
                  r={3}
                  style={{
                    transition: reducedMotion
                      ? "none"
                      : `opacity var(--ecce-duration-default) var(--ecce-easing-out) ${0.4 + i * 0.05}s`,
                  }}
                />
              )),
            )}

            <text
              fill="var(--ecce-color-ink-low)"
              fontFamily="var(--ecce-typography-family-mono)"
              fontSize={10}
              textAnchor="middle"
              x={innerWidth / 2}
              y={innerHeight + 36}
            >
              Birth cohort
            </text>
            <text
              fill="var(--ecce-color-ink-low)"
              fontFamily="var(--ecce-typography-family-mono)"
              fontSize={10}
              textAnchor="middle"
              transform={`translate(-44, ${innerHeight / 2}) rotate(-90)`}
            >
              Rate ratio (1950 = 1.0)
            </text>
          </Group>
        </svg>
        <figcaption className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--ecce-color-ink-mid)]">
          {data.series.map((series) => (
            <span className="inline-flex items-center gap-2" key={series.id}>
              <span
                aria-hidden
                className="inline-block h-[2px] w-6"
                style={{ background: seriesColors[series.id] ?? "var(--ecce-color-accent-signal)" }}
              />
              {series.label}
            </span>
          ))}
          <span className="ml-auto text-[var(--ecce-color-ink-mid)]">[STAND-IN] illustrative shape</span>
        </figcaption>
      </figure>
    </div>
  );
}
