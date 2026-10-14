import { GroupingOptions, GroupingState, Updater } from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateGrouping } from "../../../../providers/exploreState/actions/updateGrouping/dispatch";
import { GROUPING_OPTIONS } from "./constants";

/**
 * Returns the table's grouping options; grouping is off, and grouping changes
 * update the explore state.
 * @returns Grouping options.
 */
export function useGroupingOptions(): GroupingOptions {
  const { exploreDispatch } = useExploreState();

  const onGroupingChange = useCallback(
    (updaterOrValue: Updater<GroupingState>): void =>
      exploreDispatch(updateGrouping({ updaterOrValue })),
    [exploreDispatch],
  );

  return { ...GROUPING_OPTIONS, onGroupingChange };
}
