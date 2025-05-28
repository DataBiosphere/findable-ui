import { DataDictionaryActionKind } from "../types";
import { SyncStateAndUrlAction, SyncStateAndUrlPayload } from "./types";

/**
 * Action creator for "sync state and url" in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function syncStateAndUrl(
  payload: SyncStateAndUrlPayload
): SyncStateAndUrlAction {
  return {
    payload,
    type: DataDictionaryActionKind.SyncStateAndUrl,
  };
}
