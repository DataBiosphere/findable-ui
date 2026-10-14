import {
  Updater,
  VisibilityOptions,
  VisibilityState,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateVisibility } from "../../../../providers/exploreState/actions/updateVisibility/dispatch";
import { VISIBILITY_OPTIONS } from "./constants";

/**
 * Returns the table's column visibility options; columns can be hidden, and
 * visibility changes update the explore state.
 * @returns Column visibility options.
 */
export function useVisibilityOptions(): VisibilityOptions {
  const { exploreDispatch } = useExploreState();

  const onColumnVisibilityChange = useCallback(
    (updaterOrValue: Updater<VisibilityState>): void => {
      exploreDispatch(updateVisibility({ updaterOrValue }));
    },
    [exploreDispatch],
  );

  return { ...VISIBILITY_OPTIONS, onColumnVisibilityChange };
}
