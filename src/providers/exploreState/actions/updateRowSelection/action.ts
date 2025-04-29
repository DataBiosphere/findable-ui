import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { UpdateRowSelectionPayload } from "./types";
import { buildNextRowSelection } from "./utils";

/**
 * Reducer function to handle the "update row selection" action.
 * Updates the row selection in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function updateRowSelectionAction(
  state: ExploreState,
  payload: UpdateRowSelectionPayload
): ExploreState {
  const rowSelection = buildNextRowSelection(state, payload.updaterOrValue);
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { rowSelection }
    ),
  };
}
