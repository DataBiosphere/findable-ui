import { ExploreActionKind } from "../../../exploreState";
import { UpdateFilterSortAction, UpdateFilterSortPayload } from "./types";

/**
 * Action creator for updating filter sort in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateFilterSort(
  payload: UpdateFilterSortPayload,
): UpdateFilterSortAction {
  return {
    payload,
    type: ExploreActionKind.UpdateFilterSort,
  };
}
