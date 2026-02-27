import { INITIAL_STATE } from "../constants";
import { ChatState, MESSAGE_TYPE } from "../types";
import { InitialArgs } from "./types";

/**
 * Initializer function for the chat reducer, returning initial state.
 * @param initialArgs - Initial arguments.
 * @returns The initialized chat state.
 */
export function initializer(initialArgs?: InitialArgs): ChatState {
  if (!initialArgs) return INITIAL_STATE;
  return {
    ...INITIAL_STATE,
    messages: [
      { ...initialArgs, createdAt: Date.now(), type: MESSAGE_TYPE.PROMPT },
    ],
  };
}
