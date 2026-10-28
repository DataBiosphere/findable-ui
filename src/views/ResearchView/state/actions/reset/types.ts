import { ChatActionKind } from "../types";

/**
 * Action to reset the chat to its initial state.
 */
export interface ResetAction {
  payload: ResetPayload;
  type: ChatActionKind.Reset;
}

/**
 * Payload for the Reset action.
 */
export type ResetPayload = null;
