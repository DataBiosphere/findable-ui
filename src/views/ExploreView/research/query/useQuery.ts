import { FormEvent, useCallback, useEffect, useRef } from "react";
import { FIELD_NAME } from "../panel/components/Form/constants";
import { OnSubmitOptions, UseQuery } from "./types";
import { fetchResponse } from "./fetch";
import { getFormValues } from "./utils";

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
          options?.onSettled?.(form);
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
