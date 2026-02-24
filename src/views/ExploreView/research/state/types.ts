import { Dispatch } from "react";
import { ChatAction } from "./actions/types";

/**
 * Assistant message in the chat.
 */
export interface AssistantMessage<R extends MessageResponse = MessageResponse> {
  response: R;
  type: MESSAGE_TYPE.ASSISTANT;
}

/**
 * Context value for the Chat state provider.
 */
export interface ChatContextValue {
  dispatch: Dispatch<ChatAction>;
  state: ChatState;
}

/**
 * State for the Chat feature.
 */
export interface ChatState {
  loading: boolean;
  messages: Message[];
}

/**
 * Error message in the chat.
 */
export interface ErrorMessage {
  error: string;
  type: MESSAGE_TYPE.ERROR;
}

/**
 * Union type for messages in the chat.
 */
export type Message<R extends MessageResponse = MessageResponse> =
  | AssistantMessage<R>
  | ErrorMessage
  | UserMessage;

/**
 * Message types for the chat.
 */
export enum MESSAGE_TYPE {
  ASSISTANT = "ASSISTANT",
  ERROR = "ERROR",
  USER = "USER",
}

/**
 * Mention extracted from the user query.
 */
export interface Mention {
  exclude: boolean;
  facet: string;
  originalText: string;
  values: string[];
}

/**
 * Response from the research API.
 */
export interface MessageResponse {
  intent: "auto" | "study" | "variable";
  message: string | null;
  query: {
    mentions: Mention[];
    message: string | null;
  };
  timing: {
    lookupMs: number;
    pipelineMs: number;
    totalMs: number;
  };
}

/**
 * User message in the chat.
 */
export interface UserMessage {
  text: string;
  type: MESSAGE_TYPE.USER;
}
