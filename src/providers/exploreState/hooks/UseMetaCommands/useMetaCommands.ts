import { useEffect } from "react";
import { ExploreStateContextProps } from "../../../exploreState";
import { clearMeta } from "../../actions/clearMeta/dispatch";
import { navigateToFilters, replaceToFilters } from "./actions";
import { META_COMMAND } from "./types";

export const useMetaCommands = ({
  exploreDispatch,
  exploreState,
}: ExploreStateContextProps): void => {
  useEffect(() => {
    const command = exploreState.meta?.command;

    switch (command) {
      case META_COMMAND.NAVIGATE_TO_FILTERS:
        navigateToFilters(exploreState);
        exploreDispatch(clearMeta());
        break;
      case META_COMMAND.REPLACE_TO_FILTERS:
        replaceToFilters(exploreState);
        exploreDispatch(clearMeta());
        break;
      default:
        break;
    }
  }, [exploreDispatch, exploreState]);
};
