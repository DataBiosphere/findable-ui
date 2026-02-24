import { createContext } from "react";
import { ChatContextValue } from "./types";

/**
 * Context for the Chat state provider.
 */
export const ChatContext = createContext<ChatContextValue>({
  dispatch: () => undefined,
  state: { responses: [] },
});
