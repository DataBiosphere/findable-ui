import { ChatActionKind } from "../types";

/**
 * Action to set the query for a chat.
 */
export interface SetQueryAction {
  payload: SetQueryPayload;
  type: ChatActionKind.SetQuery;
}

/**
 * Payload for the SetQuery action.
 */
export interface SetQueryPayload {
  query: string;
}
