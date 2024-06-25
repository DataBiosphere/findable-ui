import { useCallback } from "react";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../../../../providers/exploreState";
import { RowPreviewState } from "../../../../../features/RowPreview/entities";

export interface UseRowPreview {
  onPreviewRow: (rowPreview: RowPreviewState) => void;
}

/**
 * Returns action to preview row and row data.
 * @returns action to preview row and row data.
 */
export const useRowPreview = (): UseRowPreview => {
  const { exploreDispatch } = useExploreState();

  const onPreviewRow = useCallback(
    (rowPreview: RowPreviewState) => {
      exploreDispatch({
        payload: rowPreview,
        type: ExploreActionKind.UpdateRowPreview,
      });
    },
    [exploreDispatch]
  );

  return { onPreviewRow };
};
