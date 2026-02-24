import { ChatActionKind } from "../types";

/**
 * Payload for the SetResponse action.
 */
export interface SetResponsePayload {
  response: string;
}

/**
 * Action to set the response for a chat.
 */
export interface SetResponseAction {
  payload: SetResponsePayload;
  type: ChatActionKind.SetResponse;
}
