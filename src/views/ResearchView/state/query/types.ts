import { FormEvent } from "react";
import { Status } from "../types";

/**
 * Options for the onSubmit action.
 */
export interface OnSubmitOptions {
  onError?: (error: Error) => void;
  onMutate?: (form: HTMLFormElement, query: string) => void;
  onSettled?: (form: HTMLFormElement) => void;
  onSuccess?: (data: unknown) => void;
  status: Status;
}

/**
 * Payload for the onSubmit action.
 */
export interface OnSubmitPayload {
  query: string;
}

/**
 * Context value for the QueryProvider.
 */
export interface QueryContextValue {
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    payload: OnSubmitPayload,
    options: OnSubmitOptions,
  ) => Promise<void>;
}
