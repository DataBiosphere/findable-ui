import {
  Updater,
  VisibilityOptions,
  VisibilityState,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { resetVisibility } from "../../../../providers/exploreState/actions/resetVisibility/dispatch";
import { updateVisibility } from "../../../../providers/exploreState/actions/updateVisibility/dispatch";
import type { ColumnVisibilityResetOptions } from "../../../Table/components/TableFeatures/ColumnVisibility/types";
import { VISIBILITY_OPTIONS } from "./constants";

/**
 * Returns the table's column visibility options; columns can be hidden, and
 * visibility changes update the explore state. Reset restores the current
 * entity's initial column visibility in explore state.
 * @returns Column visibility options.
 */
export function useVisibilityOptions(): VisibilityOptions &
  ColumnVisibilityResetOptions {
  const { exploreDispatch } = useExploreState();

  const onColumnVisibilityChange = useCallback(
    (updaterOrValue: Updater<VisibilityState>): void => {
      exploreDispatch(updateVisibility({ updaterOrValue }));
    },
    [exploreDispatch],
  );

  const onColumnVisibilityReset = useCallback((): void => {
    exploreDispatch(resetVisibility());
  }, [exploreDispatch]);

  return {
    ...VISIBILITY_OPTIONS,
    onColumnVisibilityChange,
    onColumnVisibilityReset,
  };
}
