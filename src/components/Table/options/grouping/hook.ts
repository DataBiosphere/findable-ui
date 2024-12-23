import { GroupingOptions, GroupingState, Updater } from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../providers/exploreState";
import { GROUPING_OPTIONS } from "./constants";

export function useGroupingOptions(): GroupingOptions {
  const { exploreDispatch } = useExploreState();

  const onGroupingChange = useCallback(
    (updater: Updater<GroupingState>): void => {
      exploreDispatch({
        // Since we enforce single grouping, the "old" argument in the updater function is always an empty array.
        // This ensures any new grouping action overrides the previous one.
        payload: typeof updater === "function" ? updater([]) : updater,
        type: ExploreActionKind.UpdateGrouping,
      });
    },
    [exploreDispatch]
  );

  return { ...GROUPING_OPTIONS, onGroupingChange };
}
