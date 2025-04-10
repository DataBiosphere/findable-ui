import * as Plot from "@observablehq/plot";
import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { PALETTE } from "../../../../../../../../../styles/common/mui/palette";
import { formatCountSize } from "../../../../../../../../../utils/formatCountSize";
import { DATA_FIELD, TEXT_PADDING } from "./constants";
import {
  getCategoryValueText,
  getCategoryValueTextFill,
  getColorRangeValue,
  getCountTextFill,
  getPlotHeight,
  getTicks,
  getXDomain,
  getYPaddingInner,
  getYPaddingOuter,
  isAnyValueSelected,
  renderText,
} from "./utils";

export function getPlotOptions(
  data: SelectCategoryValueView[],
  width: number
): PlotOptions {
  const isCategorySelected = isAnyValueSelected(data);
  return {
    color: {
      domain: [false, true], // false = unselected, true = selected.
      legend: false,
      range: [getColorRangeValue(isCategorySelected), PALETTE.PRIMARY_MAIN],
    },
    height: getPlotHeight(data.length),
    margin: 0,
    marginBottom: 32,
    marks: [
      Plot.axisX({
        className: "x-axis",
        tickFormat: formatCountSize,
        tickPadding: 8,
        tickSize: 0,
        ticks: getTicks(data),
      }),
      Plot.gridX({
        stroke: PALETTE.SMOKE_MAIN,
        strokeOpacity: 1,
        ticks: getTicks(data),
      }),
      Plot.barX(data, {
        className: "x-bar",
        fill: DATA_FIELD.SELECTED,
        rx1: 0,
        rx2: 4,
        sort: { y: null },
        x: DATA_FIELD.COUNT,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(data, {
        className: "text-category-label",
        dx: 16,
        dy: -28,
        fill: (d) => getCategoryValueTextFill(d, isCategorySelected),
        lineWidth: width / 13, // "em" unit; font-size is 13px.
        text: getCategoryValueText,
        textAnchor: "start",
        textOverflow: "ellipsis",
        x: 0,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(data, {
        className: "text-count",
        dx: -TEXT_PADDING,
        dy: -2,
        fill: (d) => getCountTextFill(d, isCategorySelected),
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
