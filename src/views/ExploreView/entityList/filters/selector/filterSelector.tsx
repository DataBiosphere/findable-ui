import { JSX } from "react";
import { FilterSelectorProps } from "./types";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";
import { SSFetchSSFilter } from "../strategies/SSFetchSSFilter/ssFetchSSFilter";
import { CSFetchCSFilter } from "../strategies/CSFetchCSFilter/csFetchCSFilter";
import { SSFetchCSFilter } from "../strategies/SSFetchCSFilter/ssFetchCSFilter";

/**
 * Filter strategy selector for entity list filters.
 *
 * This component determines which filter strategy to use
 * based on the current explore mode and renders the appropriate strategy component.
 *
 * Available strategies:
 * - SSFetchSSFilter: Server-side fetch with server-side filter
 * - SSFetchCSFilter: Server-side fetch with client-side filter
 * - CSFetchCSFilter: Client-side fetch with client-side filter
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @returns The selected filter strategy component.
 */
export const FilterSelector = <T = unknown,>(
  props: FilterSelectorProps<T>,
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
