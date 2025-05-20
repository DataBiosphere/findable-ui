import { useEffect } from "react";
import { ExploreStateContextProps } from "../../../exploreState";
import { clearMeta } from "../../actions/clearMeta/dispatch";
import { navigateToFilters } from "./actions";
import { META_COMMAND } from "./types";

export const useMetaCommands = ({
  exploreDispatch,
  exploreState,
}: ExploreStateContextProps): void => {
  useEffect(() => {
    const command = exploreState.meta?.command;

    // eslint-disable-next-line sonarjs/no-small-switch -- switch statement currently has 1 case.
    switch (command) {
      case META_COMMAND.NAVIGATE_TO_FILTERS:
        navigateToFilters(exploreState);
        exploreDispatch(clearMeta());
        break;
      default:
        break;
    }
  }, [exploreDispatch, exploreState]);
};
