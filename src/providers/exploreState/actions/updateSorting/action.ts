import {
  closeRowPreview,
  resetPage,
} from "../../../../providers/exploreState/utils";
import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { UpdateSortingPayload } from "./types";
import { buildNextColumnSorting } from "./utils";

/**
 * Reducer function to handle the "update sorting" action.
 * Updates the sorting in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function updateSortingAction(
  state: ExploreState,
  payload: UpdateSortingPayload
): ExploreState {
  const sorting = buildNextColumnSorting(state, payload.updaterOrValue);
  const rowPreview = closeRowPreview(state.rowPreview);
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { rowPreview, sorting }
    ),
    paginationState: resetPage(state.paginationState),
    rowPreview,
  };
}
