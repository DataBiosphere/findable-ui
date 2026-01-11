import { BaseCategoryView } from "../common/types";
import { VIEW_KIND } from "../types";

/**
 * Model of a preset category view used to render preset filter UI.
 */
export interface PresetCategoryView extends BaseCategoryView {
  presets: PresetValueView[];
}

/**
 * Model of a preset value view.
 */
export interface PresetValueView {
  key: string;
  label: string;
  selected: boolean;
}

/**
 * Model of preset category view kind.
 */
export interface PresetViewKind {
  viewKind: VIEW_KIND.PRESET;
}
