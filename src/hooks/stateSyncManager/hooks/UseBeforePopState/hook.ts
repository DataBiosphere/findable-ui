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
      const basePath = Router.basePath ?? "";
      // Use regex to remove the base path from the beginning of the URL.
      const as = basePath
        ? state.as.replace(new RegExp(`^${basePath}`), "") || "/"
        : state.as;
      // Force a full route transition to ensure page props are refreshed.
      Router.replace(as, undefined, {
        ...state.options,
        shallow: false,
      });
      return false;
    },
    []
  );

  // Pop state related side effects.
  useOnPopState(onBeforePopState);
};
