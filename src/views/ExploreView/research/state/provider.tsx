import { JSX, ReactNode, useReducer } from "react";
import { ChatContext } from "./context";
import { chatReducer } from "./reducer";
import { INITIAL_STATE } from "./constants";

/**
 * Provider for Chat state.
 * Manages chat state such as response data.
 *
 * @param props - Props.
 * @param props.children - Children.
 *
 * @returns A context provider wrapping the given children.
 */
export function ChatProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ dispatch, state }}>
      {children}
    </ChatContext.Provider>
  );
}
