import { ExploreState } from "../../../exploreState";
import {
  getEntityCategoryGroupConfigKey,
  updateEntityStateByCategoryGroupConfigKey,
} from "../../utils";
import { SyncStateFromUrlPayload } from "./types";
import { buildNextState } from "./utils";

/**
 * Reducer function to handle the "sync state from URL" action.
 * Updates the catalog state, feature flag state, and the payload entity's filter state.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function syncStateFromUrlAction(
  state: ExploreState,
  payload: SyncStateFromUrlPayload
): ExploreState {
  // Build the next state.
  const nextState = buildNextState(state, payload);

  // Grab the category group config key for the payload entityListType.
  const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    payload.entityListType,
    state.entityPageState
  );

  // Update the entity state by category group config key.
  updateEntityStateByCategoryGroupConfigKey(
    state,
    {
      filterState: payload.filterState,
      savedFilterState: [],
    },
    categoryGroupConfigKey
  );

  // Return the updated state.
  return {
    ...state,
    ...nextState,
  };
}
