import { useMemo } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { getPlotOptions } from "../../barX/plot";
import { getCategoryTotalCount } from "../../barX/utils";
import { UsePlotOptions } from "./types";

/**
 * Builds the chart's plot options for the first barCount values, with percentages of the total count of all values.
 * @param selectCategoryValueViews - Category values.
 * @param width - Plot width.
 * @param barCount - Number of bars to show; all values when undefined.
 * @returns The plot options.
 */
export const usePlotOptions = (
  selectCategoryValueViews: SelectCategoryValueView[],
  width: number,
  barCount: number | undefined,
): UsePlotOptions => {
  // Slice the category values to the number of bars to display.
  const data = selectCategoryValueViews.slice(0, barCount);

  // Build the plot options.
  const options = useMemo(
    () =>
      getPlotOptions(
        data,
        getCategoryTotalCount(selectCategoryValueViews),
        width,
      ),
    [data, selectCategoryValueViews, width],
  );

  return { options };
};
