import { setMessageAction } from "./actions/setMessage/action";
import { setQueryAction } from "./actions/setQuery/action";
import { setStatusAction } from "./actions/setStatus/action";
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
  switch (type) {
    case ChatActionKind.SetMessage: {
      return setMessageAction(state, payload);
    }
    case ChatActionKind.SetQuery: {
      return setQueryAction(state, payload);
    }
    case ChatActionKind.SetStatus: {
      return setStatusAction(state, payload);
    }
    default: {
      return state;
    }
  }
}
