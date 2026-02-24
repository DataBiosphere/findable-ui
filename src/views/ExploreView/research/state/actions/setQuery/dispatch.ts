import { ChatActionKind } from "../types";
import { SetQueryAction, SetQueryPayload } from "./types";

/**
 * Action creator for setting a query in the chat.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setQuery(payload: SetQueryPayload): SetQueryAction {
  return {
    payload,
    type: ChatActionKind.SetQuery,
  };
}
