import { ChatState, MESSAGE_TYPE } from "../../types";
import { SetQueryPayload } from "./types";

/**
 * Reducer action to set a query in the chat.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setQueryAction(
  state: ChatState,
  payload: SetQueryPayload,
): ChatState {
  return {
    ...state,
    messages: [
      ...state.messages,
      { createdAt: Date.now(), text: payload.query, type: MESSAGE_TYPE.USER },
    ],
  };
}
