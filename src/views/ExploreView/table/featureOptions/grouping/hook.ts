import { GroupingOptions, GroupingState, Updater } from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../../../../hooks/useExploreState";
import { updateGrouping } from "../../../../../providers/exploreState/actions/updateGrouping/dispatch";
import { GROUPING_OPTIONS } from "./constants";

/**
 * Returns the GroupingOptions for the table.
 * @returns GroupingOptions.
 */
export function useGroupingOptions(): GroupingOptions {
  const exploreMode = useExploreMode();
  const { exploreDispatch } = useExploreState();

  const onGroupingChange = useCallback(
    (updaterOrValue: Updater<GroupingState>): void =>
      exploreDispatch(updateGrouping({ updaterOrValue })),
    [exploreDispatch]
  );

  return {
    onGroupingChange,
    ...GROUPING_OPTIONS[exploreMode],
  };
}
