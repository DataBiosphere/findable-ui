import { Updater, VisibilityState } from "@tanstack/react-table";
import { resolveUpdater } from "../../../../components/Table/options/updater";
import { ExploreState } from "../../../exploreState";

/**
 * Builds the next column visibility state for the current entity type.
 * Uses TanStack updater to update the column visibility state.
 * @param state - Explore state.
 * @param updaterOrValue - Updater or value to update the column visibility state.
 * @returns column visibility state.
 */
export function buildNextColumnVisibility(
  state: ExploreState,
  updaterOrValue: Updater<VisibilityState>,
): VisibilityState {
  return resolveUpdater(updaterOrValue, getOldColumnVisibility(state));
}

/**
 * Retrieves the current "old" state from the explore state, for the current entity type.
 * @param state - Explore state.
 * @returns old column visibility state.
 */
function getOldColumnVisibility(state: ExploreState): VisibilityState {
  const { entityPageState, tabValue } = state;
  const { columnVisibility = {} } = entityPageState[tabValue];
  return columnVisibility;
}
