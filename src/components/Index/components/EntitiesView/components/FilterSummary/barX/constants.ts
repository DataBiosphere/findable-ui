import { BarXOptions, PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../common/entities";

export const BAR_X_OPTIONS: BarXOptions = {
  fill: (d: SelectCategoryValueView) =>
    d.selected
      ? `var(--mui-palette-primary-main)`
      : `var(--mui-palette-smoke-dark)`,
  rx1: 0,
  rx2: 4,
  x: "count",
  y: "label",
};

export const PLOT_OPTIONS: PlotOptions = {
  margin: 0,
  style: { overflow: "visible" },
  x: { label: null, grid: true, line: false, tickSize: 0 },
  y: {
    label: null,
    line: false,
    tickFormat: () => "",
    tickSize: 0,
  },
};
