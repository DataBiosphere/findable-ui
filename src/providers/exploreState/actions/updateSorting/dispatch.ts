import { ExploreActionKind } from "../../../exploreState";
import { UpdateSortingAction, UpdateSortingPayload } from "./types";

/**
 * Action creator for updating sorting in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateSorting(
  payload: UpdateSortingPayload
): UpdateSortingAction {
  return {
    payload,
    type: ExploreActionKind.UpdateSorting,
  };
}
