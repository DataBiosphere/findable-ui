import {
  ChatState,
  Message,
  MESSAGE_TYPE,
  PromptMessage,
} from "views/ExploreView/research/state/types";

/**
 * Gets the placeholder text for the input field based on the chat state.
 * If there are no messages, it returns a default prompt. If there are messages,
 * it looks for the last prompt message and uses its input prefill as the placeholder.
 * @param state - The current state of the chat.
 * @returns The placeholder text for the input field.
 */
export function getPlaceholder(state: ChatState): string {
  if (state.messages.length === 0) return "Ask anything";

  // Reverse messages, last is the latest.
  const messages = [...state.messages].reverse();

  // Find the last prompt message to use its input prefill as placeholder.
  const lastPrompt = messages.find(isPromptMessage);

  return lastPrompt?.inputPrefill || "Ask anything";
}

/**
 * Type guard to check if a message is a PromptMessage.
 * @param message - The message to check.
 * @returns True if the message is a PromptMessage, false otherwise.
 */
function isPromptMessage(message: Message): message is PromptMessage {
  return message.type === MESSAGE_TYPE.PROMPT;
}
