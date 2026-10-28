import { INITIAL_STATE } from "../../constants";
import { isInitialPromptMessage } from "../../guards/guards";
import { ChatState } from "../../types";

/**
 * Reducer action to reset the chat to its initial state.
 * Keeps the initial prompt message, if any, and discards all other messages and status.
 *
 * @param state - State.
 * @returns State.
 */
export function resetAction(state: ChatState): ChatState {
  return {
    ...INITIAL_STATE,
    messages: state.messages.filter(isInitialPromptMessage),
  };
}
