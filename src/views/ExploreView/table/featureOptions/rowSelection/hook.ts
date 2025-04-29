import {
  RowData,
  RowSelectionOptions,
  RowSelectionState,
  Updater,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../../../../hooks/useExploreState";
import { updateRowSelection } from "../../../../../providers/exploreState/actions/updateRowSelection/dispatch";
import { ROW_SELECTION_OPTIONS } from "./constants";

/**
 * Returns the RowSelectionOptions for the table.
 * @returns RowSelectionOptions.
 */
export function useRowSelectionOptions<
  T extends RowData
>(): RowSelectionOptions<T> {
  const exploreMode = useExploreMode();
  const { exploreDispatch } = useExploreState();

  const onRowSelectionChange = useCallback(
    (updaterOrValue: Updater<RowSelectionState>): void => {
      console.log("ROW SELECTION CHANGE");
      exploreDispatch(updateRowSelection({ updaterOrValue }));
    },
    [exploreDispatch]
  );

  return {
    onRowSelectionChange,
    ...(ROW_SELECTION_OPTIONS[exploreMode] as RowSelectionOptions<T>),
  };
}
