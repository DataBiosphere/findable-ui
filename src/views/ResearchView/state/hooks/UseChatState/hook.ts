import { useContext } from "react";
import { ChatContext } from "../../context";
import { ChatContextValue } from "../../types";

/**
 * Hook to access Chat state.
 *
 * @returns Chat state.
 */
export const useChatState = (): Pick<ChatContextValue, "state"> => {
  const { state } = useContext(ChatContext);

  return { state };
};
