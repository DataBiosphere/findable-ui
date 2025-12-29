import { JSX } from "react";
import { DataSelectorProps } from "./types";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";
import { SSFetchSSFilter } from "../strategies/SSFetchSSFilter/ssFetchSSFilter";
import { SSFetchCSFilter } from "../strategies/SSFetchCSFilter/ssFetchCSFilter";
import { CSFetchCSFilter } from "../strategies/CSFetchCSFilter/csFetchCSFilter";

/**
 * Data strategy selector for entity list data handling.
 *
 * This component determines which data fetch and filter strategy to use
 * based on the current explore mode and renders the appropriate strategy component.
 *
 * Available strategies:
 * - SSFetchSSFilter: Server-side fetch with server-side filter
 * - SSFetchCSFilter: Server-side fetch with client-side filter
 * - CSFetchCSFilter: Client-side fetch with client-side filter
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @returns The selected data strategy component.
 */
export const DataSelector = <T = unknown,>(
  props: DataSelectorProps<T>,
): JSX.Element => {
  const mode = useExploreMode();
  switch (mode) {
    case EXPLORE_MODE.SS_FETCH_SS_FILTERING:
      return <SSFetchSSFilter {...props} />;
    case EXPLORE_MODE.SS_FETCH_CS_FILTERING:
      return <SSFetchCSFilter {...props} />;
    case EXPLORE_MODE.CS_FETCH_CS_FILTERING:
      return <CSFetchCSFilter {...props} />;
  }
};
