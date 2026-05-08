import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KeyFigure, formatKeyFigure } from "./KeyFigure";
import type { KeyFigure as KeyFigureData } from "@/lib/content/types";

const figure: KeyFigureData = {
  id: "wgs_target",
  label_en: "Whole genome sequences (target)",
  value: 12400,
  unit: null,
  display: "target",
  asOf: "2026-05-08",
  source: { label: "WP2 work-package plan" },
  owner: "Sir Mike Stratton, Wellcome Sanger Institute",
};

describe("KeyFigure", () => {
  it("formats numeric values using English grouping", () => {
    expect(formatKeyFigure(figure)).toBe("12,400");
  });

  it("renders source and owner for assistive technology", () => {
    const view = render(<KeyFigure figure={figure} />);
    expect(view.getByText("Whole genome sequences (target)")).toBeInTheDocument();
    expect(view.getByText(/Source: WP2 work-package plan/)).toBeInTheDocument();
  });
});
