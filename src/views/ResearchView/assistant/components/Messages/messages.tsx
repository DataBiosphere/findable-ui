import { JSX } from "react";
import { StyledStack } from "./messages.styles";
import { MessagesProps } from "./types";
import { MessageSelector } from "./selector/messageSelector";
import { useScroll } from "./hooks/UseScroll/hook";

/**
 * Renders chat messages, delegating each to the message selector.
 * @param props - Component props.
 * @param props.state - Chat state.
 * @returns The messages list element.
 */
export const Messages = ({ state }: MessagesProps): JSX.Element | null => {
  const ref = useScroll([state.messages]);

  if (state.messages.length === 0) return null;

  return (
    <StyledStack ref={ref} useFlexGap>
      {state.messages.map((message, index) => (
        <MessageSelector
          key={message.createdAt}
          isLast={index === state.messages.length - 1}
          message={message}
        />
      ))}
    </StyledStack>
  );
};
