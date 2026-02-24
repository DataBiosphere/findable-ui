import { setMessageAction } from "./actions/setMessage/action";
import { ChatAction, ChatActionKind } from "./actions/types";
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
    case ChatActionKind.SetMessage: {
      return setMessageAction(state, payload);
    }
    default: {
      return state;
    }
  }
}
