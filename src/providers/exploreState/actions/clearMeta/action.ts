import { ExploreState } from "../../../exploreState";
import { ClearMetaPayload } from "./types";

/**
 * Reducer function to handle the "clear meta" action.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function clearMetaAction(
  state: ExploreState,
  payload: ClearMetaPayload
): ExploreState {
  return {
    ...state,
    meta: payload,
  };
}
