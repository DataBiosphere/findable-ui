import { ExploreActionKind } from "../../../exploreState";
import { SyncStateFromUrlAction, SyncStateFromUrlPayload } from "./types";

/**
 * Action creator for syncing state from URL.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function syncStateFromUrl(
  payload: SyncStateFromUrlPayload
): SyncStateFromUrlAction {
  return {
    payload,
    type: ExploreActionKind.SyncStateFromUrl,
  };
}
