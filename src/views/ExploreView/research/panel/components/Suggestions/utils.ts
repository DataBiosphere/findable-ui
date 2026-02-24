import {
  ChatState,
  MESSAGE_TYPE,
  PromptSuggestion,
  SUGGESTION_VARIANT,
} from "../../../state/types";

/**
 * Retrieves prompt suggestions from the chat state, filtering for those with the CHIP variant.
 * @param state - Chat state.
 * @returns An array of prompt suggestions with the CHIP variant, or undefined if there are no messages or the last message is not a prompt.
 */
export function getPromptSuggestions(
  state: ChatState,
): PromptSuggestion[] | undefined {
  const { messages } = state;
  if (messages.length === 0) return undefined;

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.type !== MESSAGE_TYPE.PROMPT) return undefined;

  return lastMessage.suggestions?.filter(filterVariant);
}

/**
 * Filters prompt suggestions to include only those with the CHIP variant.
 * @param suggestion - A prompt suggestion to evaluate.
 * @returns True if the suggestion has the CHIP variant, false otherwise.
 */
function filterVariant(suggestion: PromptSuggestion): boolean {
  return suggestion.variant === SUGGESTION_VARIANT.CHIP;
}
