import { RefObject } from "react";
import { SelectCategoryView } from "../../../../../../../../../common/entities";

/**
 * Return type for the useChartView hook.
 */
export interface UseChartView {
  chartViewRef: RefObject<HTMLDivElement | null>;
  selectCategoryViews: SelectCategoryView[];
  width: number;
}
