import { DataDictionaryActionKind } from "../types";
import { UpdateStateFromUrlAction, UpdateStateFromUrlPayload } from "./types";

/**
 * Action creator for "update state from url" in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateStateFromUrl(
  payload: UpdateStateFromUrlPayload
): UpdateStateFromUrlAction {
  return {
    payload,
    type: DataDictionaryActionKind.UpdateStateFromUrl,
  };
}
