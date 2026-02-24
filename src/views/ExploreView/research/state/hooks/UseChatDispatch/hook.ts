import { useCallback, useContext } from "react";
import { setMessage } from "../../actions/setMessage/dispatch";
import { setQuery } from "../../actions/setQuery/dispatch";
import { ChatContext } from "../../context";
import { MessageResponse } from "../../types";
import { UseChatDispatch } from "./types";

/**
 * Hook to dispatch Chat actions.
 * @returns Object containing action dispatch functions.
 */
export const useChatDispatch = (): UseChatDispatch => {
  const { dispatch } = useContext(ChatContext);

  const onSetMessage = useCallback(
    <R extends MessageResponse>(response: R) => {
      dispatch(setMessage({ response }));
    },
    [dispatch],
  );

  const onSetQuery = useCallback(
    (query: string) => {
      dispatch(setQuery({ query }));
    },
    [dispatch],
  );

  return { onSetMessage, onSetQuery };
};
