import { useCallback, useContext, useMemo } from "react";
import { reset } from "../../actions/reset/dispatch";
import { setError } from "../../actions/setError/dispatch";
import { setMessage } from "../../actions/setMessage/dispatch";
import { setQuery } from "../../actions/setQuery/dispatch";
import { setStatus } from "../../actions/setStatus/dispatch";
import { ChatContext } from "../../context";
import { MessageResponse } from "../../types";
import { UseChatDispatch } from "./types";

/**
 * Hook to dispatch Chat actions.
 * @returns Object containing action dispatch functions.
 */
export const useChatDispatch = (): UseChatDispatch => {
  const { dispatch } = useContext(ChatContext);

  const onReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const onSetError = useCallback(
    (error: string) => {
      dispatch(setError({ error }));
    },
    [dispatch],
  );

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

  const onSetStatus = useCallback(
    (loading: boolean) => {
      dispatch(setStatus({ loading }));
    },
    [dispatch],
  );

  return useMemo(
    () => ({ onReset, onSetError, onSetMessage, onSetQuery, onSetStatus }),
    [onReset, onSetError, onSetMessage, onSetQuery, onSetStatus],
  );
};
