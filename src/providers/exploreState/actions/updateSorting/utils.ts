import { ColumnSort, Updater } from "@tanstack/react-table";
import { resolveUpdater } from "../../../../components/Table/options/updater";
import { ExploreState } from "../../../exploreState";

/**
 * Builds the next column sorting state for the current entity type.
 * Uses TanStack updater to update the column sorting state.
 * @param state - Explore state.
 * @param updaterOrValue - Updater or value to update the column sorting state.
 * @returns column sorting state.
 */
export function buildNextColumnSorting(
  state: ExploreState,
  updaterOrValue: Updater<ColumnSort[]>
): ColumnSort[] {
  return resolveUpdater(updaterOrValue, getOldColumnSorting(state));
}

/**
 * Retrieves the current "old" state from the explore state, for the current entity type.
 * @param state - Explore state.
 * @returns old column sorting state.
 */
function getOldColumnSorting(state: ExploreState): ColumnSort[] {
  const { entityPageState, tabValue } = state;
  const { sorting = [] } = entityPageState[tabValue];
  return sorting;
}
