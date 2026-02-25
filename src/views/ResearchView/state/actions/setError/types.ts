import { ChatActionKind } from "../types";

/**
 * Action to set an error message in the chat.
 */
export interface SetErrorAction {
  payload: SetErrorPayload;
  type: ChatActionKind.SetError;
}

/**
 * Payload for the SetError action.
 */
export interface SetErrorPayload {
  error: string;
}
