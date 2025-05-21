import { ExploreState } from "../../../exploreState";
import { getFilterCount } from "../../../exploreState/utils";
import { SyncStateFromUrlPayload } from "./types";

/**
 * Builds the next state, syncing the catalog state, feature flag state, and filter state.
 * @param state - Explore state.
 * @param payload - Payload.
 * @returns state.
 */
export function buildNextState(
  state: ExploreState,
  payload: SyncStateFromUrlPayload
): Partial<ExploreState> {
  // Initialize filter count and filter state from current state.
  let filterCount = state.filterCount;
  let filterState = state.filterState;

  // Only update filter count and filter state if the payload entityListType matches the current tab value.
  if (payload.entityListType === state.tabValue) {
    filterCount = getFilterCount(payload.filterState);
    filterState = payload.filterState;
  }

  return {
    catalogState: payload.catalogState,
    featureFlagState: payload.featureFlagState,
    filterCount,
    filterState,
  };
}
