import { useReducer } from "react";
import { initializer } from "../../initializer/initializer";
import { InitialArgs } from "../../initializer/types";
import { chatReducer } from "../../reducer";
import { ChatContextValue } from "../../types";

/**
 * Hook that manages the chat reducer with initial state from config.
 * @param initialArgs - Initial arguments for the chat state.
 * @returns Chat context value with dispatch and state.
 */
export const useChatReducer = (initialArgs?: InitialArgs): ChatContextValue => {
  const [state, dispatch] = useReducer(chatReducer, initialArgs, initializer);
  return { dispatch, state };
};
