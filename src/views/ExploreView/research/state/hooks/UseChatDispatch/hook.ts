import { useCallback, useContext } from "react";
import { ChatContext } from "../../context";
import { setMessage } from "../../actions/setMessage/dispatch";
import { UseChatDispatch } from "./types";

/**
 * Hook to dispatch Chat actions.
 * @returns Object containing action dispatch functions.
 */
export const useChatDispatch = (): UseChatDispatch => {
  const { dispatch } = useContext(ChatContext);

  const onSetMessage = useCallback(
    (message: string) => {
      dispatch(setMessage({ message }));
    },
    [dispatch],
  );

  return { onSetMessage };
};
