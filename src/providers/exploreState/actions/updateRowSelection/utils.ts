import { RowSelectionState, Updater } from "@tanstack/react-table";
import { resolveUpdater } from "../../../../components/Table/options/updater";
import { ExploreState } from "../../../exploreState";

/**
 * Builds the next row selection state for the current entity type.
 * Uses TanStack updater to update the row selection state.
 * @param state - Explore state.
 * @param updaterOrValue - Updater or value to update the row selection state.
 * @returns row selection state.
 */
export function buildNextRowSelection(
  state: ExploreState,
  updaterOrValue: Updater<RowSelectionState>
): RowSelectionState {
  return resolveUpdater(updaterOrValue, getOldRowSelection(state));
}

/**
 * Retrieves the current "old" state from the explore state, for the current entity type.
 * @param state - Explore state.
 * @returns old row selection state.
 */
function getOldRowSelection(state: ExploreState): RowSelectionState {
  const { entityPageState, tabValue } = state;
  const { rowSelection = {} } = entityPageState[tabValue];
  return rowSelection;
}
