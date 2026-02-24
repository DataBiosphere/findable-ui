import { JSX } from "react";
import { StyledStack } from "./messages.styles";
import { MessagesProps } from "./types";
import { MessageSelector } from "./selector/messageSelector";

/**
 * Renders chat messages, delegating each to the message selector.
 * @param props - Component props.
 * @param props.state - Chat state.
 * @returns The messages list element.
 */
export const Messages = ({ state }: MessagesProps): JSX.Element | null => {
  if (state.messages.length === 0) return null;
  return (
    <StyledStack useFlexGap>
      {state.messages.map((message, i) => (
        <MessageSelector key={i} message={message} />
      ))}
    </StyledStack>
  );
};
