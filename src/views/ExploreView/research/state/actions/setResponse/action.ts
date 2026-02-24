import { ChatState } from "../../types";
import { SetResponsePayload } from "./types";

/**
 * Reducer action to set the response for a chat.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setResponseAction(
  state: ChatState,
  payload: SetResponsePayload,
): ChatState {
  return {
    ...state,
    responses: [...state.responses, payload.response],
  };
}
