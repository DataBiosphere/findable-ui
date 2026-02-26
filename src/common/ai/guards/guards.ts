import {
  AssistantMessage,
  ErrorMessage,
  Message,
  MESSAGE_TYPE,
  MessageResponse,
  PromptMessage,
  UserMessage,
} from "../../../views/ResearchView/state/types";

/**
 * Returns true if the message is an assistant message.
 * @param message - Chat message.
 * @returns True if the message is an assistant message.
 */
export function isAssistantMessage<R extends MessageResponse = MessageResponse>(
  message: Message,
): message is AssistantMessage<R> {
  return message.type === MESSAGE_TYPE.ASSISTANT;
}

/**
 * Returns true if the message is an error message.
 * @param message - Chat message.
 * @returns True if the message is an error message.
 */
export function isErrorMessage(message: Message): message is ErrorMessage {
  return message.type === MESSAGE_TYPE.ERROR;
}

/**
 * Returns true if the message is the initial prompt message.
 * @param message - Chat message.
 * @returns True if the message is the initial prompt message.
 */
export function isInitialPromptMessage(
  message: Message,
): message is PromptMessage & { initial: true } {
  return isPromptMessage(message) && message.initial === true;
}

/**
 * Returns true if the message is a prompt message.
 * @param message - Chat message.
 * @returns True if the message is a prompt message.
 */
export function isPromptMessage(message: Message): message is PromptMessage {
  return message.type === MESSAGE_TYPE.PROMPT;
}

/**
 * Returns true if the message is a user message.
 * @param message - Chat message.
 * @returns True if the message is a user message.
 */
export function isUserMessage(message: Message): message is UserMessage {
  return message.type === MESSAGE_TYPE.USER;
}
