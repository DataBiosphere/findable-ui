import { ChatActionKind } from "../types";
import { SetResponseAction, SetResponsePayload } from "./types";

/**
 * Action creator for setting the response for a chat.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setResponse(payload: SetResponsePayload): SetResponseAction {
  return {
    payload,
    type: ChatActionKind.SetResponse,
  };
}
