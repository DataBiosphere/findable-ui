import { ChatActionKind } from "../types";
import { SetErrorAction, SetErrorPayload } from "./types";

/**
 * Action creator for setting an error message in the chat.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setError(payload: SetErrorPayload): SetErrorAction {
  return {
    payload,
    type: ChatActionKind.SetError,
  };
}
