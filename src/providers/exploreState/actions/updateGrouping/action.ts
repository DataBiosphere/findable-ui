import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { UpdateGroupingPayload } from "./types";
import { buildNextGrouping } from "./utils";

/**
 * Reducer function to handle the "update grouping" action.
 * Updates the grouping in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function updateGroupingAction(
  state: ExploreState,
  payload: UpdateGroupingPayload
): ExploreState {
  const grouping = buildNextGrouping(state, payload.updaterOrValue);
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { grouping }
    ),
  };
}
