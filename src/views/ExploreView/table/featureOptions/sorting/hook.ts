import {
  ColumnSort,
  RowData,
  SortingOptions,
  Updater,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { track } from "../../../../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  SORT_DIRECTION,
} from "../../../../../common/analytics/entities";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../../../../hooks/useExploreState";
import { updateSorting } from "../../../../../providers/exploreState/actions/updateSorting/dispatch";
import { SORTING_OPTIONS } from "./constants";

/**
 * Returns the SortingOptions for the table.
 * @returns SortingOptions.
 */
export function useSortingOptions<T extends RowData>(): SortingOptions<T> {
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const { entityPageState, tabValue } = exploreState;
  const { sorting } = entityPageState[tabValue];

  const onSortingChange = useCallback(
    (updaterOrValue: Updater<ColumnSort[]>): void => {
      console.log("SORTING CHANGE");
      exploreDispatch(updateSorting({ updaterOrValue }));
      // Execute GTM tracking.
      // TODO(cc) update tracking to handle sorting of multiple columns.
      // TODO(cc) GTM tracking when `onSortingChange` is triggered only tracks the first column sorted, and takes the value from explore state which is not updated yet.
      track(EVENT_NAME.ENTITY_TABLE_SORTED, {
        [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
        [EVENT_PARAM.COLUMN_NAME]: sorting?.[0]?.id, // TODO(cc) sorting should always be at least `[]` and never `undefined`.
        [EVENT_PARAM.SORT_DIRECTION]: sorting?.[0]?.desc // TODO(cc) sorting should always be at least `[]` and never `undefined`.
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC,
      });
    },
    [exploreDispatch, sorting]
  );

  return { onSortingChange, ...SORTING_OPTIONS[exploreMode] };
}
