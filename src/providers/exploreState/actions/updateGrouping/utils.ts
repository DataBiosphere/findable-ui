import { GroupingState, Updater } from "@tanstack/react-table";
import { resolveUpdater } from "../../../../components/Table/options/common/utils";
import { ExploreState } from "../../../exploreState";

/**
 * Builds the next grouping state for the current entity type.
 * Uses TanStack updater to update the grouping state.
 * @param state - Explore state.
 * @param updaterOrValue - Updater or value to update the grouping state.
 * @returns grouping state.
 */
export function buildNextGrouping(
  state: ExploreState,
  updaterOrValue: Updater<GroupingState>
): GroupingState {
  const grouping = resolveUpdater(updaterOrValue, getOldGrouping(state));
  if (grouping.length > 1) {
    // Explore state only supports single-column grouping.
    return grouping.slice(-1);
  }
  return grouping;
}

/**
 * Retrieves the current "old" grouping state from the explore state, for the current entity type.
 * @param state - Explore state.
 * @returns old grouping state.
 */
function getOldGrouping(state: ExploreState): GroupingState {
  const { entityPageState, tabValue } = state;
  const { grouping = [] } = entityPageState[tabValue];
  return grouping;
}
