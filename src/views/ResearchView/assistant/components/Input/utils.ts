import {
  type ChatState,
  type Message,
  MESSAGE_TYPE,
} from "../../../state/types";
import { DEFAULT_PLACEHOLDER } from "./constants";

/**
 * Returns the input placeholder a message sets, if any: a prompt message's own, or an assistant message's response's.
 * @param message - The message.
 * @returns The input placeholder, or undefined when the message does not set one.
 */
function getMessageInputPlaceholder(message: Message): string | undefined {
  switch (message.type) {
    case MESSAGE_TYPE.ASSISTANT:
      return message.response.inputPlaceholder;
    case MESSAGE_TYPE.PROMPT:
      return message.inputPlaceholder;
    default:
      return undefined;
  }
}

/**
 * Gets the placeholder text for the input field based on the chat state.
 * Uses the input placeholder of the latest message that sets one: a prompt message, or an assistant message's response.
 * Falls back to a default prompt when no message sets one.
 * @param state - The current state of the chat.
 * @returns The placeholder text for the input field.
 */
export function getPlaceholder(state: ChatState): string {
  // Reverse messages, last is the latest.
  const messages = [...state.messages].reverse();

  for (const message of messages) {
    const inputPlaceholder = getMessageInputPlaceholder(message);
    if (inputPlaceholder) return inputPlaceholder;
  }

  return DEFAULT_PLACEHOLDER;
}
