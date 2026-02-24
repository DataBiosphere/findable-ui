import { useCallback, useContext } from "react";
import { ChatContext } from "../../context";
import { setResponse } from "../../actions/setResponse/dispatch";
import { UseChatDispatch } from "./types";

/**
 * Hook to dispatch Chat actions.
 * @returns Object containing action dispatch functions.
 */
export const useChatDispatch = (): UseChatDispatch => {
  const { dispatch } = useContext(ChatContext);

  const onSetResponse = useCallback(
    (response: string) => {
      dispatch(setResponse({ response }));
    },
    [dispatch],
  );

  return { onSetResponse };
};
