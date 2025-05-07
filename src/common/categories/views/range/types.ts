import { SelectedRange } from "../../models/range/types";
import { BaseCategoryView } from "../common/types";
import { VIEW_KIND } from "../types";

/**
 * View model of range category.
 */
export interface RangeCategoryView extends BaseCategoryView {
  max: number | undefined;
  min: number | undefined;
  selectedMax: SelectedRange[1];
  selectedMin: SelectedRange[0];
  unit?: string;
}

/**
 * Model of range category view kind.
 */
export interface RangeViewKind {
  viewKind: VIEW_KIND.RANGE;
}
