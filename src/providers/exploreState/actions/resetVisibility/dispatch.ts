import { ExploreActionKind } from "../../../exploreState";
import { ResetColumnVisibilityAction } from "./types";

/**
 * Action creator for resetting the current entity's column visibility to its initial state.
 * @returns Action with payload and action type.
 */
export function resetVisibility(): ResetColumnVisibilityAction {
  return {
    payload: undefined,
    type: ExploreActionKind.ResetColumnVisibility,
  };
}
