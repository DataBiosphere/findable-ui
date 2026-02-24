import { ChatActionKind } from "../types";

/**
 * Payload for the SetMessage action.
 */
export interface SetMessagePayload {
  message: string;
}

/**
 * Action to set the message for a chat.
 */
export interface SetMessageAction {
  payload: SetMessagePayload;
  type: ChatActionKind.SetMessage;
}
