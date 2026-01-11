import { ClearPresetAction } from "./clearPreset/types";
import { SetPresetAction } from "./setPreset/types";

/**
 * Union of all ExploreView actions.
 */
export type ExploreViewAction = ClearPresetAction | SetPresetAction;

/**
 * Action kind identifiers for the ExploreView reducer.
 */
export enum ExploreViewActionKind {
  ClearPreset = "CLEAR_PRESET",
  SetPreset = "SET_PRESET",
}
