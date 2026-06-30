import { JSX } from "react";
import { StyledMarkdownRenderer } from "./assistantMessage.styles";
import { MARKDOWN_CLASS_NAME } from "./constants";
import { AssistantMessageProps } from "./types";

/**
 * Renders an assistant message as sanitized markdown.
 * The renderer carries the stable `MARKDOWN_CLASS_NAME` class so consuming apps
 * can override its styles with global styles (e.g. MUI `GlobalStyles`) targeting
 * `.assistant-message-markdown`.
 * @param props - Component props.
 * @param props.message - Assistant message.
 * @returns The assistant message element, or null if there is no message.
 */
export const AssistantMessage = ({
  message,
}: AssistantMessageProps): JSX.Element | null => {
  if (!message.response.message) return null;
  return (
    <StyledMarkdownRenderer
      className={MARKDOWN_CLASS_NAME}
      value={message.response.message}
    />
  );
};
