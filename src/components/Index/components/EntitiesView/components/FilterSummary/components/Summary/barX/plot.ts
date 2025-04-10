import * as Plot from "@observablehq/plot";
import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { PALETTE } from "../../../../../../../../../styles/common/mui/palette";
import { DATA_FIELD, TEXT_PADDING, TICKS } from "./constants";
import {
  getCategoryText,
  getPlotHeight,
  getXDomain,
  getXRange,
  getYPaddingInner,
  getYPaddingOuter,
  renderText,
} from "./utils";

export function getPlotOptions(
  data: SelectCategoryValueView[],
  width: number
): PlotOptions {
  return {
    color: {
      domain: [false, true], // false = unselected, true = selected.
      legend: false,
      range: [PALETTE.SMOKE_DARK, PALETTE.PRIMARY_MAIN],
    },
    height: getPlotHeight(data.length),
    margin: 0,
    marginBottom: 32,
    marks: [
      Plot.gridX({
        stroke: PALETTE.SMOKE_MAIN,
        strokeOpacity: 1,
        ticks: TICKS,
      }),
      Plot.barX(data, {
        fill: DATA_FIELD.SELECTED,
        rx1: 0,
        rx2: 4,
        x: DATA_FIELD.COUNT,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(data, {
        dx: 16,
        dy: -28,
        fill: (d) => (d.selected ? PALETTE.INK_MAIN : PALETTE.INK_LIGHT),
        text: getCategoryText,
        textAnchor: "start",
        x: 0,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(data, {
        dx: -TEXT_PADDING,
        dy: -2,
        fill: (d) => (d.selected ? PALETTE.COMMON_WHITE : PALETTE.INK_LIGHT),
        fontWeight: 500,
        lineHeight: 0.8125,
        render: renderText,
        text: DATA_FIELD.COUNT,
        textAnchor: "end",
        x: DATA_FIELD.COUNT,
        y: DATA_FIELD.LABEL,
      }),
    ],
    style: {
      dominantBaseline: "middle",
      font: "inherit",
      overflow: "visible",
    },
    width,
    x: {
      domain: getXDomain(data),
      grid: false,
      label: null,
      line: false,
      tickPadding: 8,
      tickSize: 0,
      ticks: {
        floor: (x) => x,
        offset: (x) => x,
        range: getXRange,
      },
    },
    y: {
      label: null,
      line: false,
      paddingInner: getYPaddingInner(),
      paddingOuter: getYPaddingOuter(),
      tickFormat: () => "",
      tickSize: 0,
    },
  };
}
