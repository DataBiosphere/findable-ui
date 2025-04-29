import { Updater } from "@tanstack/react-table";
import {
  RowPreviewOptions,
  RowPreviewState,
} from "components/Table/features/RowPreview/entities";
import { useCallback } from "react";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../../../../hooks/useExploreState";
import { updateRowPreview } from "../../../../../providers/exploreState/actions/updateRowPreview/dispatch";
import { ROW_PREVIEW_OPTIONS } from "./constants";

/**
 * Returns the RowPreviewOptions for the table.
 * @returns RowPreviewOptions.
 */
export function useRowPreviewOptions(): RowPreviewOptions {
  const exploreMode = useExploreMode();
  const { exploreDispatch } = useExploreState();

  const onRowPreviewChange = useCallback(
    (updaterOrValue: Updater<RowPreviewState>): void => {
      exploreDispatch(updateRowPreview({ updaterOrValue }));
    },
    [exploreDispatch]
  );

  return {
    onRowPreviewChange,
    ...(ROW_PREVIEW_OPTIONS[exploreMode] as RowPreviewOptions),
  };
}
