import { JSX, Suspense } from "react";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { CSFetchCSFilter } from "../strategies/CSFetchCSFilter/csFetchCSFilter";
import { LazySSFetchCSFilter } from "../strategies/SSFetchCSFilter/lazy";
import { LazySSFetchSSFilter } from "../strategies/SSFetchSSFilter/lazy";
import type { DataSelectorProps } from "./types";

/**
 * Data strategy selector for the entity list: renders the one data fetch and filter strategy for the configured
 * explore mode. The server-side fetching strategies are lazy-loaded, so apps that don't fetch from the server never
 * download them or TanStack Query.
 *
 * Available strategies:
 * - SSFetchSSFilter: Server-side fetch with server-side filter.
 * - SSFetchCSFilter: Server-side fetch with client-side filter.
 * - CSFetchCSFilter: Client-side fetch with client-side filter.
 * @typeParam T - Entity type.
 * @param props - Props.
 * @param props.data - Statically loaded entities of the explore page, if any.
 * @param props.entityListType - Entity list type of the explore page.
 * @returns The selected data strategy.
 */
export const DataSelector = <T = unknown,>({
  data,
  entityListType,
}: DataSelectorProps<T>): JSX.Element => {
  const mode = useExploreMode();
  switch (mode) {
    case EXPLORE_MODE.CS_FETCH_CS_FILTERING:
      return <CSFetchCSFilter data={data} entityListType={entityListType} />;
    case EXPLORE_MODE.SS_FETCH_CS_FILTERING:
      return (
        <Suspense fallback={null}>
          <LazySSFetchCSFilter entityListType={entityListType} />
        </Suspense>
      );
    case EXPLORE_MODE.SS_FETCH_SS_FILTERING:
      return (
        <Suspense fallback={null}>
          <LazySSFetchSSFilter entityListType={entityListType} />
        </Suspense>
      );
  }
};
