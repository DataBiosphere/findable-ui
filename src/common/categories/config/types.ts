import {
  CategoryKey,
  DataDictionaryAnnotation,
  SelectCategoryValueView,
} from "../../entities";
import { PresetDefinition } from "./preset/types";
import { PresetViewKind } from "../views/preset/types";
import { RangeViewKind } from "../views/range/types";
import { SelectViewKind } from "../views/select/types";

/**
 * Category config.
 */
export type CategoryConfig =
  | PresetCategoryConfig
  | RangeCategoryConfig
  | SelectCategoryConfig;

/**
 * Common category config.
 */
export interface CommonCategoryConfig {
  annotation?: DataDictionaryAnnotation;
  key: CategoryKey;
  label: string; // human readable label
}

/**
 * Preset category config.
 */
export interface PresetCategoryConfig
  extends CommonCategoryConfig, PresetViewKind {
  presets: PresetDefinition[];
}

/**
 * Range category config.
 */
export interface RangeCategoryConfig
  extends CommonCategoryConfig, RangeViewKind {
  unit?: string; // e.g. "kg"
}

/**
 * Select category config.
 */
export interface SelectCategoryConfig
  extends CommonCategoryConfig, SelectViewKind {
  enableChartView?: boolean;
  mapSelectCategoryValue?: (
    selectCategoryValue: SelectCategoryValueView,
  ) => SelectCategoryValueView;
}
