import { ChatActionKind } from "../types";
import { SetMessageAction, SetMessagePayload } from "./types";

/**
 * Action creator for setting a message in the chat.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setMessage(payload: SetMessagePayload): SetMessageAction {
  return {
    payload,
    type: ChatActionKind.SetMessage,
  };
}
