import { useMemo } from "react";
import type { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { getPlotOptions } from "../../barX/plot";
import { getCategoryTotalCount } from "../../barX/utils";
import type { UsePlotOptions } from "./types";

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
  const options = useMemo(
    () =>
      getPlotOptions(
        selectCategoryValueViews.slice(0, barCount),
        getCategoryTotalCount(selectCategoryValueViews),
        width,
      ),
    [barCount, selectCategoryValueViews, width],
  );

  return { options };
};
