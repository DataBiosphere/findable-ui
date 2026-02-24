import { Dispatch } from "react";
import { ChatAction } from "./actions/types";

export interface ChatState {
  responses: string[];
}

/**
 * Context value for the Chat state provider.
 */
export interface ChatContextValue {
  dispatch: Dispatch<ChatAction>;
  state: ChatState;
}
