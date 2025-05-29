import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { clearMeta } from "../../../exploreState/actions/clearMeta/dispatch";
import { updateUrlFromState } from "./handlers";
import { META_COMMAND } from "./types";
import { getQueryState } from "./utils";

export const useMetaCommands = (): void => {
  const { exploreDispatch, exploreState } = useExploreState();

  // Router must be ready before executing any meta-command side effects.
  const { isReady, query } = useRouter();

  // Command.
  const command = exploreState.meta?.command;

  // Extract relevant state to update URL.
  const state = useMemo(() => getQueryState(exploreState), [exploreState]);

  useEffect(() => {
    // Do nothing if the router is not ready.
    if (!isReady) return;

    switch (command) {
      case META_COMMAND.STATE_TO_URL_PUSH:
        updateUrlFromState(state, query);
        exploreDispatch(clearMeta());
        break;
      case META_COMMAND.STATE_TO_URL_REPLACE:
        updateUrlFromState(state, query, "replace");
        exploreDispatch(clearMeta());
        break;
      default:
        break;
    }
  }, [command, exploreDispatch, isReady, query, state]);
};
