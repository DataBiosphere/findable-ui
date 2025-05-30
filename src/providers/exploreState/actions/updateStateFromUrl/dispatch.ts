import { ExploreActionKind } from "../../../exploreState";
import { UpdateStateFromUrlAction, UpdateStateFromUrlPayload } from "./types";

/**
 * Action creator for updating state from URL.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateStateFromUrl(
  payload: UpdateStateFromUrlPayload
): UpdateStateFromUrlAction {
  return {
    payload,
    type: ExploreActionKind.UpdateStateFromUrl,
  };
}
