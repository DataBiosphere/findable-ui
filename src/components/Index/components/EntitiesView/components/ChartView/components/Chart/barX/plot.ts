import * as Plot from "@observablehq/plot";
import { PlotOptions } from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { PALETTE } from "../../../../../../../../../styles/common/constants/palette";
import { formatCountSize } from "../../../../../../../../../utils/formatCountSize";
import { DATA_FIELD, MARGIN_LEFT, TEXT_PADDING } from "./constants";
import {
  getCategoryTotalCount,
  getCategoryValueText,
  getCategoryValueTextFill,
  getColorRangeValue,
  getCountText,
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
  selectCategoryValueViews: SelectCategoryValueView[],
  width: number
): PlotOptions {
  const isCategorySelected = isAnyValueSelected(selectCategoryValueViews);
  const totalCount = getCategoryTotalCount(selectCategoryValueViews);
  return {
    color: {
      domain: [false, true], // false = unselected, true = selected.
      legend: false,
      range: [getColorRangeValue(isCategorySelected), PALETTE.PRIMARY_MAIN],
    },
    height: getPlotHeight(selectCategoryValueViews.length),
    margin: 0,
    marginBottom: 32,
    marginLeft: MARGIN_LEFT,
    marks: [
      Plot.axisX({
        className: "x-axis",
        tickFormat: formatCountSize,
        tickPadding: 8,
        tickSize: 0,
        ticks: getTicks(selectCategoryValueViews),
      }),
      Plot.gridX({
        stroke: PALETTE.SMOKE_MAIN,
        strokeOpacity: 1,
        ticks: getTicks(selectCategoryValueViews),
      }),
      Plot.barX(selectCategoryValueViews, {
        className: "x-bar",
        fill: DATA_FIELD.SELECTED,
        rx1: 0,
        rx2: 4,
        sort: { order: "descending", y: "x" }, // Sort by count (x-axis), descending.
        x: DATA_FIELD.COUNT,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(selectCategoryValueViews, {
        className: "text-category-label",
        dx: -TEXT_PADDING,
        dy: -2,
        fill: (d) => getCategoryValueTextFill(d, isCategorySelected),
        lineHeight: 0.8125,
        lineWidth: (MARGIN_LEFT - TEXT_PADDING) / 13, // "em" unit; font-size is 13px.
        text: getCategoryValueText,
        textAnchor: "end",
        textOverflow: "ellipsis",
        title: getCategoryValueText,
        x: 0,
        y: DATA_FIELD.LABEL,
      }),
      Plot.text(selectCategoryValueViews, {
        className: "text-count",
        dx: -TEXT_PADDING,
        dy: -2,
        fill: (d) => getCountTextFill(d, isCategorySelected),
        fontWeight: 500,
        lineHeight: 0.8125,
        render: renderText,
        text: (d) => getCountText(d, totalCount),
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
      domain: getXDomain(selectCategoryValueViews),
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
      type: "band", // Treats number-like strings as categorical labels to prevent numeric scale warnings.
    },
  };
}
