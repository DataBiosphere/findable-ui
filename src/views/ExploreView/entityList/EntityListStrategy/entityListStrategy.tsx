import { JSX } from "react";
import { EntityListStrategyProps } from "./types";
import { useExploreMode } from "../../../../hooks/useExploreMode/useExploreMode";
import { EXPLORE_MODE } from "../../../../hooks/useExploreMode/types";
import { SSFetchSSFilter } from "../strategy/SSFetchSSFilter/ssFetchSSFilter";
import { NAFetchNAFilter } from "../strategy/NAFetchNAFilter/naFetchNAFilter";

/**
 * Strategy selector for entity list data handling.
 *
 * This component determines which data fetching and filtering strategy to use
 * based on the current explore mode and renders the appropriate strategy component.
 *
 * Available strategies:
 * - SSFetchSSFilter: Server-side fetching with server-side filtering
 * - NAFetchNAFilter: Fallback for no fetching / filtering modes
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @returns The selected strategy component.
 */
export const EntityListStrategy = <T = unknown,>(
  props: EntityListStrategyProps<T>,
): JSX.Element => {
  const mode = useExploreMode();
  switch (mode) {
    case EXPLORE_MODE.SS_FETCH_SS_FILTERING:
      return <SSFetchSSFilter {...props} />;
    case EXPLORE_MODE.SS_FETCH_CS_FILTERING:
    case EXPLORE_MODE.CS_FETCH_CS_FILTERING:
    default:
      return <NAFetchNAFilter {...props} />;
  }
};
