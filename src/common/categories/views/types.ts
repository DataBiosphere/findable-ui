import { SelectCategoryView } from "../../entities";
import { PresetCategoryView } from "./preset/types";
import { RangeCategoryView } from "./range/types";

/**
 * Possible category view model types.
 */
export type CategoryView =
  | PresetCategoryView
  | RangeCategoryView
  | SelectCategoryView;

/**
 * Category view kind.
 */
export enum VIEW_KIND {
  PRESET = "PRESET",
  RANGE = "RANGE",
  SELECT = "SELECT",
}
