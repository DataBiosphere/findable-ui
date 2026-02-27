import { ChatActionKind } from "../types";

/**
 * Action to set the loading status for a chat.
 */
export interface SetStatusAction {
  payload: SetStatusPayload;
  type: ChatActionKind.SetStatus;
}

/**
 * Payload for the SetStatus action.
 */
export interface SetStatusPayload {
  loading: boolean;
}
