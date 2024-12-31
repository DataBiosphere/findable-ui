import { ExploreActionKind } from "../../../exploreState";
import { UpdateGroupingAction, UpdateGroupingPayload } from "./types";

/**
 * Action creator for updating grouping in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateGrouping(
  payload: UpdateGroupingPayload
): UpdateGroupingAction {
  return {
    payload,
    type: ExploreActionKind.UpdateGrouping,
  };
}
