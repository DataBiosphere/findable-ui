import { Message } from "../../../../state/types";

/**
 * Props for the MessageSelector component.
 */
export interface MessageSelectorProps {
  isLast: boolean;
  message: Message;
}
