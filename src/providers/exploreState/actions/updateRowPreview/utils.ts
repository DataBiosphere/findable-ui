import { Updater } from "@tanstack/react-table";
import { RowPreviewState } from "../../../../components/Table/features/RowPreview/entities";
import { resolveUpdater } from "../../../../components/Table/options/updater";
import { ExploreState } from "../../../exploreState";

/**
 * Builds the next row preview state for the current entity type.
 * Uses TanStack updater to update the row preview state.
 * @param state - Explore state.
 * @param updaterOrValue - Updater or value to update the row preview state.
 * @returns row preview state.
 */
export function buildNextRowPreview(
  state: ExploreState,
  updaterOrValue: Updater<RowPreviewState>
): RowPreviewState {
  return resolveUpdater(updaterOrValue, getOldRowPreview(state));
}

/**
 * Retrieves the current "old" state from the explore state, for the current entity type.
 * @param state - Explore state.
 * @returns old row selection state.
 */
function getOldRowPreview(state: ExploreState): RowPreviewState {
  const { entityPageState, tabValue } = state;
  const { rowPreview = {} } = entityPageState[tabValue];
  return rowPreview;
}
