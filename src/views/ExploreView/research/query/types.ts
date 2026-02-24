import { FormEvent } from "react";

/**
 * Actions returned by the useQuery hook.
 */
export interface Actions {
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    options?: OnSubmitOptions,
  ) => Promise<void>;
}

/**
 * Options for the onSubmit action.
 */
export interface OnSubmitOptions {
  onError?: (error: Error) => void;
  onMutate?: (form: HTMLFormElement, query: string) => void;
  onSettled?: () => void;
  onSuccess?: (data: unknown) => void;
}

/**
 * Return type for the useQuery hook.
 */
export interface UseQuery {
  actions: Actions;
}
