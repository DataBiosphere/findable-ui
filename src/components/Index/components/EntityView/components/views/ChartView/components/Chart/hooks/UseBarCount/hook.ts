import { useCallback, useState } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { UseBarCount } from "./types";
import { initBarCount, updateBarCount } from "./utils";

/**
 * Manages the number of bars a chart shows: the maximum bar count (MAX_BAR_COUNT) when there are more values than that, otherwise all of them. Toggling switches between the maximum bar count and all.
 * The initial bar count is set from the first render's values.
 * @param selectCategoryValueViews - Category values.
 * @returns The bar count, undefined when all bars are shown, and its toggle handler.
 */
export const useBarCount = (
  selectCategoryValueViews: SelectCategoryValueView[],
): UseBarCount => {
  const [barCount, setBarCount] = useState<number | undefined>(
    initBarCount(selectCategoryValueViews),
  );

  const onToggleBarCount = useCallback(() => {
    setBarCount(updateBarCount);
  }, []);

  return { barCount, onToggleBarCount };
};
