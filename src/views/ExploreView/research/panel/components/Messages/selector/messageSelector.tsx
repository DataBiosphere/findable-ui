import { JSX } from "react";
import { MESSAGE_TYPE } from "../../../../state/types";
import { AssistantMessage } from "../components/AssistantMessage/assistantMessage";
import { ErrorMessage } from "../components/ErrorMessage/errorMessage";
import { PromptMessage } from "../components/PromptMessage/promptMessage";
import { UserMessage } from "../components/UserMessage/userMessage";
import { MessageSelectorProps } from "./types";

/**
 * Selects and renders the appropriate message component based on message type.
 *
 * Available types:
 * - `ASSISTANT`: Displays assistant messages.
 * - `ERROR`: Displays error messages.
 * - `PROMPT`: Displays prompt messages.
 * - `USER`: Displays user messages.
 *
 * @param props - Component props.
 * @param props.message - Chat message.
 * @returns The selected message component.
 */
export const MessageSelector = ({
  message,
}: MessageSelectorProps): JSX.Element => {
  switch (message.type) {
    case MESSAGE_TYPE.ASSISTANT:
      return <AssistantMessage message={message} />;
    case MESSAGE_TYPE.ERROR:
      return <ErrorMessage message={message} />;
    case MESSAGE_TYPE.PROMPT:
      return <PromptMessage message={message} />;
    case MESSAGE_TYPE.USER:
      return <UserMessage message={message} />;
  }
};
