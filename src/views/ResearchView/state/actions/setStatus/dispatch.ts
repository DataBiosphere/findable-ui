import { ChatActionKind } from "../types";
import { SetStatusAction, SetStatusPayload } from "./types";

/**
 * Action creator for setting the loading status in the chat.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setStatus(payload: SetStatusPayload): SetStatusAction {
  return {
    payload,
    type: ChatActionKind.SetStatus,
  };
}
