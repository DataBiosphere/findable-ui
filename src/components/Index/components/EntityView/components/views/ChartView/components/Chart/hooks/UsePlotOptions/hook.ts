import { useMemo } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { getPlotOptions } from "../../barX/plot";
import { getCategoryTotalCount } from "../../barX/utils";
import { UsePlotOptions } from "./types";

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
