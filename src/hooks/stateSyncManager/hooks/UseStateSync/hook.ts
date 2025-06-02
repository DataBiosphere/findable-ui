import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { ROUTER_METHOD } from "../../../../providers/exploreState/actions/stateToUrl/types";
import { useWasPop } from "../../../../providers/services/wasPop/hook";
import {
  StateToUrlPayload,
  UrlToStatePayload,
  UseStateSyncManagerProps,
} from "../../types";
import { hasParams, isSynced } from "./utils";

export const useStateSync = <DispatchType>({
  actions,
  dispatch,
  state,
}: UseStateSyncManagerProps<DispatchType>): void => {
  const { isReady, query } = useRouter();
  const { wasPop } = useWasPop();

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
      console.log("SYNCED - NOTHING TO DO");
      return;
    }

    // Dispatch action sync URL >> state.
    if (wasPop) {
      // When the user navigates with the back/forward buttons.
      console.log("POP STATE");
      dispatch(
        actions.urlToState({ query } as UrlToStatePayload<DispatchType>)
      );
      return;
    }

    // Dispatch action sync URL >> state.
    if (hasParams(query, paramKeys)) {
      // When the URL has parameters.
      dispatch(
        actions.urlToState({ query } as UrlToStatePayload<DispatchType>)
      );
      return;
    }

    // Otherwise, dispatch action sync URL << state.
    dispatch(
      actions.stateToUrl({
        method: ROUTER_METHOD.REPLACE,
      } as StateToUrlPayload<DispatchType>)
    );
  }, [isReady, query, wasPop]);
};
