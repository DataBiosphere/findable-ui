import { FormEvent, useCallback, useRef, useState } from "react";
import { UseQuery } from "./types";
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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formValues = getFormValues(form);

      // Get the query value from the AI input field
      const query = formValues[FIELD_NAME.AI_PROMPT];
      if (!query) return;
      if (loading) return;

      setLoading(true);

      // TODO: handle dispatching query to store

      // Reset the form
      form.reset();

      // Abort any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      await fetchResponse(url, query, {
        controller,
        onError: (error) => {
          // TODO: handle dispatching error to store
          console.error("Research query error:", error);
        },
        onSettled: () => {
          setLoading(false);
          const input = form.elements.namedItem(FIELD_NAME.AI_PROMPT);
          if (input instanceof HTMLElement) input.focus();
        },
        onSuccess: (data) => {
          // TODO: handle dispatching response to store
          console.log("Research query response:", data);
        },
      });
    },
    [loading, url],
  );

  return { actions: { onSubmit }, status: { loading } };
};
