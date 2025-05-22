import { ExploreActionKind } from "../../../exploreState";
import { ClearMetaAction } from "./types";

/**
 * Action creator for clearing meta in the state.
 * @returns Action with payload and action type.
 */
export function clearMeta(): ClearMetaAction {
  return {
    payload: null,
    type: ExploreActionKind.ClearMeta,
  };
}
