import { MessageResponse } from "../../types";

/**
 * Return type for the useChatDispatch hook.
 */
export interface UseChatDispatch {
  onSetMessage: <R extends MessageResponse>(response: R) => void;
  onSetQuery: (query: string) => void;
}
