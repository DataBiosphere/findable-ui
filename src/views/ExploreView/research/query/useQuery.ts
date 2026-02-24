import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { OnSubmitOptions, UseQuery } from "./types";
import { FIELD_NAME } from "./constants";
import { getFormValues } from "./utils";
import { fetchResponse } from "./fetch";

/**
 * Custom hook for managing the state and actions of an AI-chat query form.
 * @param url - The URL to send the query to.
 * @returns An object containing the actions and status of the query.
 */
export const useQuery = (url?: string): UseQuery => {
  const abortRef = useRef<AbortController>(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, options?: OnSubmitOptions) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formValues = getFormValues(form);

      // Get the query value from the AI input field
      const query = formValues[FIELD_NAME.AI_PROMPT];
      if (!query) return;
      if (loading) return;

      setLoading(true);

      // Call onMutate callback
      options?.onMutate?.(query);

      // Reset the form
      form.reset();

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
          setLoading(false);
          const input = form.elements.namedItem(FIELD_NAME.AI_PROMPT);
          if (input instanceof HTMLElement) input.focus();
          options?.onSettled?.();
        },
        onSuccess: (data) => {
          options?.onSuccess?.(data);
        },
      });
    },
    [loading, url],
  );

  // Abort any in-flight request on unmount.
  useEffect(() => {
    return (): void => {
      abortRef.current?.abort();
    };
  }, []);

  return { actions: { onSubmit }, status: { loading } };
};
