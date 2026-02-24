import { ChatState } from "../../types";
import { SetStatusPayload } from "./types";

/**
 * Reducer action to set the loading status in the chat.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setStatusAction(
  state: ChatState,
  payload: SetStatusPayload,
): ChatState {
  return {
    ...state,
    loading: payload.loading,
  };
}
