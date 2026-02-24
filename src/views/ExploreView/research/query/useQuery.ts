import { FormEvent, useCallback, useEffect, useRef } from "react";
import { OnSubmitOptions, UseQuery } from "./types";
import { FIELD_NAME } from "./constants";
import { getFormValues } from "./utils";
import { fetchResponse } from "./fetch";

/**
 * Custom hook for managing the actions of an AI-chat query form.
 * @param url - The URL to send the query to.
 * @returns An object containing the actions of the query.
 */
export const useQuery = (url?: string): UseQuery => {
  const abortRef = useRef<AbortController>(null);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, options?: OnSubmitOptions) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formValues = getFormValues(form);

      // Get the query value from the AI input field
      const query = formValues[FIELD_NAME.AI_PROMPT];
      if (!query) return;

      // Call onMutate callback
      options?.onMutate?.(form, query);

      // Abort any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      await fetchResponse(url, query, {
        controller,
        onError: (error) => {
          options?.onError?.(error);
        },
        onSettled: () => {
          const input = form.elements.namedItem(FIELD_NAME.AI_PROMPT);
          if (input instanceof HTMLElement) input.focus();
          options?.onSettled?.();
        },
        onSuccess: (data) => {
          options?.onSuccess?.(data);
        },
      });
    },
    [url],
  );

  // Abort any in-flight request on unmount.
  useEffect(() => {
    return (): void => {
      abortRef.current?.abort();
    };
  }, []);

  return { actions: { onSubmit } };
};
