import { createContext } from "react";
import { ChatContextValue } from "./types";
import { INITIAL_STATE } from "./constants";

/**
 * Context for the Chat state provider.
 */
export const ChatContext = createContext<ChatContextValue>({
  dispatch: () => undefined,
  state: INITIAL_STATE,
});
