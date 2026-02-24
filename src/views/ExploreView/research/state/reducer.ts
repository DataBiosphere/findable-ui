import { setResponseAction } from "./actions/setResponse/action";
import { ChatActionKind, ChatAction } from "./actions/types";
import { ChatState } from "./types";

/**
 * Reducer for the Chat state.
 *
 * @param state - State.
 * @param action - Action.
 * @returns State.
 */
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  const { payload, type } = action;
  // eslint-disable-next-line sonarjs/no-small-switch -- reducer switch statement.
  switch (type) {
    case ChatActionKind.SetResponse: {
      return setResponseAction(state, payload);
    }
    default: {
      return state;
    }
  }
}
