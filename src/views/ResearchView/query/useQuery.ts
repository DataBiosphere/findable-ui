import { FormEvent, useCallback, useEffect, useRef } from "react";
import { OnSubmitOptions, OnSubmitPayload, UseQuery } from "./types";
import { fetchResponse } from "./fetch";

/**
 * Custom hook for managing the actions of a chat query form.
 * @param url - The URL to send the query to.
 * @returns An object containing the actions of the query.
 */
export const useQuery = (url: string): UseQuery => {
  const abortRef = useRef<AbortController>(null);

  const onSubmit = useCallback(
    async (
      e: FormEvent<HTMLFormElement>,
      payload: OnSubmitPayload,
      options?: OnSubmitOptions,
    ) => {
      e.preventDefault();

      if (options?.status?.loading) return;

      const form = e.currentTarget;
      const { query } = payload;

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
