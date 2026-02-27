import { MessageResponse } from "../../types";

/**
 * Return type for the useChatDispatch hook.
 */
export interface UseChatDispatch {
  onSetError: (error: string) => void;
  onSetMessage: <R extends MessageResponse>(response: R) => void;
  onSetQuery: (query: string) => void;
  onSetStatus: (loading: boolean) => void;
}
