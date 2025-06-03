import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { UseStateSyncManagerProps } from "../../types";
import { META_COMMAND } from "./types";

export const useMetaCommands = <Action>({
  actions,
  dispatch,
  state,
}: UseStateSyncManagerProps<Action>): void => {
  const { isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    const { command, query } = state;

    switch (command) {
      case META_COMMAND.STATE_TO_URL_PUSH:
        Router.push({ query }, undefined, { shallow: true });
        dispatch(actions.clearMeta());
        break;
      case META_COMMAND.STATE_TO_URL_REPLACE:
        Router.replace({ query }, undefined, { shallow: true });
        dispatch(actions.clearMeta());
        break;
      default:
        break;
    }
  }, [actions, dispatch, isReady, state]);
};
