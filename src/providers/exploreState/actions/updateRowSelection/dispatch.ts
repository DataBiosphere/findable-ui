import { ExploreActionKind } from "../../../exploreState";
import { UpdateRowSelectionAction, UpdateRowSelectionPayload } from "./types";

/**
 * Action creator for updating row selection in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateRowSelection(
  payload: UpdateRowSelectionPayload
): UpdateRowSelectionAction {
  return {
    payload,
    type: ExploreActionKind.UpdateRowSelection,
  };
}
