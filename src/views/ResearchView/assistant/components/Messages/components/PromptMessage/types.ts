import { PromptMessage } from "../../../../../state/types";

/**
 * Props for the PromptMessage component.
 */
export interface PromptMessageProps {
  isLast: boolean;
  message: PromptMessage;
}
