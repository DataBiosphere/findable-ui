import { RefObject } from "react";
import { SelectCategoryView } from "../../../../../../../../../common/entities";

export interface UseChartView {
  chartViewRef: RefObject<HTMLDivElement> | null;
  selectCategoryViews: SelectCategoryView[];
  width: number;
}
