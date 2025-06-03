import Router from "next/router";
import { useCallback } from "react";
import {
  BeforePopStateCallback,
  NextHistoryState,
} from "../../../../services/beforePopState/types";
import { useOnPopState } from "../../../../services/beforePopState/useOnPopState";

export const useBeforePopState = (): void => {
  // Callback to handle beforePopState.
  const onBeforePopState = useCallback<BeforePopStateCallback>(
    (state: NextHistoryState) => {
      // Force a full route transition to ensure page props are refreshed.
      Router.replace(state.url, state.as, { ...state.options, shallow: false });
      return false;
    },
    []
  );

  // Pop state related side effects.
  useOnPopState(onBeforePopState);
};
