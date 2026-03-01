import { FormEvent, useCallback, useRef } from "react";
import { fetchResponse } from "../../../../query/fetch";
import { useChatDispatch } from "../../../hooks/UseChatDispatch/hook";
import { MessageResponse } from "../../../types";
import {
  OnSubmitOptions,
  OnSubmitPayload,
  QueryContextValue,
} from "../../types";

/**
 * Hook that manages query submission and abort lifecycle.
 * @param url - The API URL to send queries to.
 * @returns Object containing the onSubmit handler.
 */
export const useSubmit = (url: string): Pick<QueryContextValue, "onSubmit"> => {
  const abortRef = useRef<AbortController>(null);
  const dispatch = useChatDispatch();

  const onSubmit = useCallback(
    async (
      e: FormEvent<HTMLFormElement>,
      payload: OnSubmitPayload,
      options: OnSubmitOptions,
    ): Promise<void> => {
      e.preventDefault();

      if (options.status.loading) return;

      const { query } = payload;
      if (!query) return;

      const form = e.currentTarget;

      // Dispatch query and loading state.
      dispatch.onSetQuery(query);
      dispatch.onSetStatus(true);
      form.reset();
      options.onMutate?.(form, query);

      // Abort any in-flight request.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      await fetchResponse(url, query, {
        controller,
        onError: (error) => {
          dispatch.onSetError(error.message);
          options.onError?.(error);
        },
        onSettled: () => {
          dispatch.onSetStatus(false);
          options.onSettled?.(form);
        },
        onSuccess: (data) => {
          dispatch.onSetMessage(data as MessageResponse);
          options.onSuccess?.(data);
        },
      });
    },
    [dispatch, url],
  );

  return { onSubmit };
};
