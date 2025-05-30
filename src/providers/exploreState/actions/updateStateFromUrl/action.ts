import { ExploreState } from "../../../exploreState";
import {
  getEntityCategoryGroupConfigKey,
  updateEntityStateByCategoryGroupConfigKey,
} from "../../utils";
import { UpdateStateFromUrlPayload } from "./types";
import { buildNextState } from "./utils";

/**
 * Reducer function to handle the "update state from URL" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateStateFromUrlAction(
  state: ExploreState,
  payload: UpdateStateFromUrlPayload
): ExploreState {
  // Build the next state.
  const nextState = buildNextState(state, payload);

  console.log("REQUEST UPDATE", "payload", payload, "nextState", nextState);

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
