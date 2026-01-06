import {
  Updater,
  VisibilityOptions,
  VisibilityState,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateVisibility } from "../../../../providers/exploreState/actions/updateVisibility/dispatch";
import { VISIBILITY_OPTIONS } from "./constants";

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
