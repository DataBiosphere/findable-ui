import { useMemo } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { sortCategoryValueViewsCount } from "../../../../../../../../../../../common/filters/sort/models/utils";
import { getPlotOptions } from "../../barX/plot";
import { getCategoryTotalCount } from "../../barX/utils";
import { UsePlotOptions } from "./types";

export const usePlotOptions = (
  selectCategoryValueViews: SelectCategoryValueView[],
  width: number,
  barCount: number | undefined,
): UsePlotOptions => {
  // Organise the select category value views (sort and slice) for chart display.
  const data = selectCategoryValueViews
    // Sort the category values by count and label.
    .sort(sortCategoryValueViewsCount)
    // Slice the category values to the number of bars to display.
    .slice(0, barCount);

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
