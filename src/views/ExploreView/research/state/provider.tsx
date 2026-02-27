import { JSX, ReactNode } from "react";
import { ChatContext } from "./context";
import { useChatReducer } from "./hooks/UseChatReducer/hook";
import { InitialArgs } from "./initializer/types";

/**
 * Provider for Chat state.
 * Manages chat state such as query and response data.
 *
 * @param props - Props.
 * @param props.children - Children.
 * @param props.initialArgs - Initial arguments.
 *
 * @returns A context provider wrapping the given children.
 */
export function ChatProvider({
  children,
  initialArgs,
}: {
  children: ReactNode;
  initialArgs?: InitialArgs;
}): JSX.Element {
  const reducer = useChatReducer(initialArgs);
  return (
    <ChatContext.Provider value={reducer}>{children}</ChatContext.Provider>
  );
}
