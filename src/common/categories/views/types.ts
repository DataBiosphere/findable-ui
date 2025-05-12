import { SelectCategoryView } from "../../entities";
import { RangeCategoryView } from "./range/types";

/**
 * Possible category view model types.
 */
export type CategoryView = RangeCategoryView | SelectCategoryView;

/**
 * Category view kind.
 */
export enum VIEW_KIND {
  RANGE = "RANGE",
  SELECT = "SELECT",
}
