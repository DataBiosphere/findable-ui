import { ChatState, MESSAGE_TYPE } from "../../types";
import { SetMessagePayload } from "./types";

/**
 * Reducer action to set a message in the chat.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setMessageAction(
  state: ChatState,
  payload: SetMessagePayload,
): ChatState {
  return {
    ...state,
    messages: [
      ...state.messages,
      {
        createdAt: Date.now(),
        response: payload.response,
        type: MESSAGE_TYPE.ASSISTANT,
      },
    ],
  };
}
