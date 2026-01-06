import { GroupingOptions, GroupingState, Updater } from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateGrouping } from "../../../../providers/exploreState/actions/updateGrouping/dispatch";
import { GROUPING_OPTIONS } from "./constants";

export function useGroupingOptions(): GroupingOptions {
  const { exploreDispatch } = useExploreState();

  const onGroupingChange = useCallback(
    (updaterOrValue: Updater<GroupingState>): void =>
      exploreDispatch(updateGrouping({ updaterOrValue })),
    [exploreDispatch],
  );

  return { ...GROUPING_OPTIONS, onGroupingChange };
}
