import { FormEvent } from "react";

/**
 * Actions returned by the useQuery hook.
 */
export interface Actions {
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    payload: OnSubmitPayload,
    options?: OnSubmitOptions,
  ) => Promise<void>;
}

/**
 * Options for the onSubmit action.
 */
export interface OnSubmitOptions {
  onError?: (error: Error) => void;
  onMutate?: (form: HTMLFormElement, query: string) => void;
  onSettled?: (form: HTMLFormElement) => void;
  onSuccess?: (data: unknown) => void;
  status?: { loading: boolean };
}

/**
 * Payload for the onSubmit action.
 */
export interface OnSubmitPayload {
  query: string;
}

/**
 * Return type for the useQuery hook.
 */
export interface UseQuery {
  actions: Actions;
}
