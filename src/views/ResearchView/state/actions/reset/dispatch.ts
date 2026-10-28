import { ChatActionKind } from "../types";
import { ResetAction } from "./types";

/**
 * Action creator for resetting the chat to its initial state.
 * @returns Action with payload and action type.
 */
export function reset(): ResetAction {
  return {
    payload: null,
    type: ChatActionKind.Reset,
  };
}
