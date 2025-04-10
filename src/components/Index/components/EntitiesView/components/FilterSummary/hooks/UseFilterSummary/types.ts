import { RefObject } from "react";
import { SelectCategoryView } from "../../../../../../../../common/entities";

export interface UseFilterSummary {
  summaries: SelectCategoryView[];
  summariesRef: RefObject<HTMLDivElement> | null;
  width: number;
}
