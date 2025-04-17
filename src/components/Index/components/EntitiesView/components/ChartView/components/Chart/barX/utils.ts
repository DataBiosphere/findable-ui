import {
  ChannelValues,
  Context,
  Dimensions,
  RenderFunction,
  ScaleFunctions,
} from "@observablehq/plot";
import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { PALETTE } from "../../../../../../../../../styles/common/mui/palette";
import { BAR_GAP, BAR_HEIGHT, TEXT_PADDING, TICKS } from "./constants";

/**
 * Returns the text for the category value point.
 * @param d - Data point.
 * @returns Formatted text string.
 */
export function getCategoryValueText(d: SelectCategoryValueView): string {
  if (d.selected) return `${d.label} (selected)`;
  return d.label;
}

/**
 * Returns the fill color for the category value point.
 * @param d - Data point.
 * @param isCategorySelected - Flag indicating if any value is selected.
 * @returns Fill color string.
 */
export function getCategoryValueTextFill(
  d: SelectCategoryValueView,
  isCategorySelected: boolean
): string {
  if (d.selected) return PALETTE.INK_MAIN;
  if (isCategorySelected) return PALETTE.INK_LIGHT;
  return PALETTE.INK_MAIN;
}

/**
 * Returns the color range value for "false" (unselected).
 * @param isCategorySelected - Flag indicating if any value is selected.
 * @returns Color range value.
 */
export function getColorRangeValue(isCategorySelected: boolean): string {
  return isCategorySelected ? PALETTE.SMOKE_LIGHT : "#C5E3FC";
}

/**
 * Returns the fill color for the count point.
 * @param d - Data point.
 * @param isCategorySelected - Flag indicating if any value is selected.
 * @returns Fill color string.
 */
export function getCountTextFill(
  d: SelectCategoryValueView,
  isCategorySelected: boolean
): string {
  if (d.selected) return PALETTE.COMMON_WHITE;
  if (isCategorySelected) return PALETTE.SMOKE_DARK;
  return PALETTE.INK_MAIN;
}

/**
 * Calculates the total SVG height required to render a horizontal bar chart (barX).
 * The computed height includes:
 * - Padding space equivalent to one bar above the first and below the last bar,
 * - Vertical gaps between bars,
 * - A fixed bottom margin.
 * @param numberOfBars - Number of bars to display.
 * @returns Height.
 */
export function getPlotHeight(numberOfBars: number): number {
  return (numberOfBars + 2) * BAR_HEIGHT + (numberOfBars - 1) * BAR_GAP + 32;
}

/**
 * Rounds up a number to the next "nice" stop value for axis scaling.
 * This function returns an upper bound based on the input value's
 * order of magnitude. It calculates axis limits or tick maximums
 * for consistent and readable chart scales.
 * The function applies standard magnitude-based steps:
 * - Rounds up to 2.5×, 5×, 7.5×, or 10× the base magnitude
 * - Ensures minimum stop of 10
 * @param n - Number.
 * @returns A rounded "nice" stop value suitable for axis ticks.
 */
export function getStop(n: number): number {
  if (n <= 10) return 10;

  // Calculate the magnitude e.g. 10, 100, 1000
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));

  for (const multiplier of [1, 2.5, 5, 7.5, 10]) {
    if (n <= magnitude * multiplier) {
      return magnitude * multiplier;
    }
  }

  return magnitude * 10;
}

/**
 * Returns the ticks for the x-axis.
 * @param data - Data.
 * @returns Ticks.
 */
export function getTicks(data: SelectCategoryValueView[]): number[] {
  const domain = getXDomain(data);
  return getXRange(domain[0], domain[1]);
}

/**
 * Returns the `x` domain.
 * @param data - Data.
 * @returns Domain.
 */
export function getXDomain(data: SelectCategoryValueView[]): [number, number] {
  const max = Math.max(...data.map((d) => d.count));
  return [0, getStop(max)];
}

/**
 * Generates an evenly spaced numeric range between a start and stop value.
 * The range includes a fixed number of steps (6), where each value is spaced
 * by a step size derived from the adjusted stop value via `getStop`.
 * Used for grid lines along the x-axis.
 * @param start - Start value.
 * @param stop - Stop value.
 * @returns Range.
 */
export function getXRange(start: number, stop: number): number[] {
  const ticks = [];
  const steps = TICKS;
  const step = getStop(stop) / (steps - 1);
  for (let i = 0; i < steps; i++) {
    ticks.push(start + i * step);
  }
  return ticks;
}

/**
 * Calculates the inner padding ratio for a band scale's y-axis.
 * This determines the proportional spacing between adjacent bars in a bar chart.
 * @returns The inner padding value as a fraction (between 0 and 1).
 */
export function getYPaddingInner(): number {
  return BAR_GAP / (BAR_HEIGHT + BAR_GAP);
}

/**
 * Calculates the outer padding ratio for a band scale's y-axis.
 * This represents the proportional space above the first bar and below the last bar
 * in a vertical layout. It ensures that the outer margins are visually balanced and
 * match the bar height, so the chart breathes evenly at the top and bottom.
 * @returns The outer padding value as a fraction (between 0 and 1).
 */
export function getYPaddingOuter(): number {
  return BAR_HEIGHT / (BAR_HEIGHT + BAR_GAP);
}

/**
 * Checks if any value in the data array is selected.
 * @param data - Data.
 * @returns True if any value is selected, false otherwise.
 */
export function isAnyValueSelected(data: SelectCategoryValueView[]): boolean {
  return data.some(({ selected }) => selected);
}

/**
 * Parses a transform `translate` string and returns the x and y coordinates.
 * @param translate - The transform `translate` string.
 * @returns A tuple of the x and y coordinates.
 */
export function parseTranslate(translate: string | null): [number, number] {
  const match = translate?.match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)\s*\)/);
  let tx = 0;
  let ty = 0;
  if (match) {
    tx = parseFloat(match[1]);
    ty = parseFloat(match[2]);
  }
  return [tx, ty];
}

/**
 * Renders text elements for count values, positioning them either inside or outside bars
 * based on available space. If text doesn't fit inside a bar, it's repositioned outside
 * with adjusted styling.
 * @param index - The mark's (filtered and transformed) index.
 * @param scales - The plot's scale functions.
 * @param values - The mark's (possibly scaled and transformed) channel values.
 * @param dimensions - The plot's dimensions.
 * @param context - The plot's context.
 * @param next - The next render function in the chain.
 * @returns SVG element or null
 */
export function renderText(
  index: number[],
  scales: ScaleFunctions,
  values: ChannelValues,
  dimensions: Dimensions,
  context: Context,
  next?: RenderFunction
): SVGElement | null {
  const g = next?.(index, scales, values, dimensions, context);
  if (!g) return null;
  requestAnimationFrame(() => {
    const textEls = g.querySelectorAll("text");
    for (const textEl of textEls) {
      const ctm = textEl.getCTM();
      const bBox = textEl.getBBox();
      if (!ctm || !bBox) continue;
      // If the text doesn't fit inside the bar, reposition it outside.
      if (ctm.e - bBox.width - TEXT_PADDING < 0) {
        const [tx, ty] = parseTranslate(textEl.getAttribute("transform"));
        // Translate by the width of the bar plus padding on each side.
        textEl.setAttribute(
          "transform",
          `translate(${tx + bBox.width + TEXT_PADDING * 2}, ${ty})`
        );
        // If the text fill is white, change it to ink.
        const fill = textEl.getAttribute("fill");
        if (fill === PALETTE.COMMON_WHITE) {
          textEl.setAttribute("fill", PALETTE.INK_MAIN);
        }
      }
    }
  });
  return g;
}
