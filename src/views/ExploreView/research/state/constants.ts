import { ChatState } from "./types";

/**
 * Initial state for the chat reducer.
 */
export const INITIAL_STATE: ChatState = {
  messages: [],
  status: { loading: false },
};
