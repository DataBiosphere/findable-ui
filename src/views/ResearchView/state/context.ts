import { createContext } from "react";
import { INITIAL_STATE } from "./constants";
import { ChatContextValue } from "./types";

/**
 * Context for the Chat state provider.
 */
export const ChatContext = createContext<ChatContextValue>({
  dispatch: () => undefined,
  state: INITIAL_STATE,
});
