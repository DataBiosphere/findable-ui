import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { UpdateColumnVisibilityPayload } from "./types";
import { buildNextColumnVisibility } from "./utils";

/**
 * Reducer function to handle the "update column visibility" action.
 * Updates the column visibility in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function updateColumnVisibilityAction(
  state: ExploreState,
  payload: UpdateColumnVisibilityPayload,
): ExploreState {
  const columnVisibility = buildNextColumnVisibility(
    state,
    payload.updaterOrValue,
  );
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { columnVisibility },
    ),
  };
}
