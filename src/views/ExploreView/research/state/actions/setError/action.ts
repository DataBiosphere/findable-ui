import { ChatState, MESSAGE_TYPE } from "../../types";
import { SetErrorPayload } from "./types";

/**
 * Reducer action to set an error message in the chat.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setErrorAction(
  state: ChatState,
  payload: SetErrorPayload,
): ChatState {
  return {
    ...state,
    messages: [
      ...state.messages,
      { error: payload.error, type: MESSAGE_TYPE.ERROR },
    ],
  };
}
