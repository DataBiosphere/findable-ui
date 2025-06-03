import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { ROUTER_METHOD } from "../../../../providers/exploreState/actions/stateToUrl/types";
import { useWasPop } from "../../../../providers/services/wasPop/hook";
import { UseStateSyncManagerProps } from "../../types";
import { hasParams, isSynced, wasPop } from "./utils";

export const useStateSync = <Action>({
  actions,
  dispatch,
  state,
}: UseStateSyncManagerProps<Action>): void => {
  const { isReady, pathname, query } = useRouter();
  const { onClearPopRef, popRef } = useWasPop();

  // Extract the query from the state.
  const stateQuery = state.query as NextRouter["query"];

  // Extract the param keys from the state.
  const paramKeys = state.paramKeys;

  // Dispatch action to sync state <-> URL.
  useEffect(() => {
    // Do nothing if the router is not ready.
    if (!isReady) return;

    // Do nothing; URL and state are in sync.
    if (isSynced(stateQuery, query)) {
      onClearPopRef();
      return;
    }

    // Dispatch action sync URL >> state.
    if (wasPop(pathname, popRef.current)) {
      // When the user navigates with the back/forward buttons.
      dispatch(actions.urlToState({ query }));
      onClearPopRef();
      return;
    }

    // Dispatch action sync URL >> state.
    if (hasParams(query, paramKeys)) {
      // When the URL has parameters.
      dispatch(actions.urlToState({ query }));
      return;
    }

    // Otherwise, dispatch action sync URL << state.
    dispatch(actions.stateToUrl({ method: ROUTER_METHOD.REPLACE }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberate omission of `state.query`, `state.paramKeys`, `actions` and `dispatch` from dependencies, hook is only expected to run when the Next.js router changes.
  }, [isReady, pathname, query]);
};
