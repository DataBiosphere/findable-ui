import { ExploreState } from "../../../exploreState";
import { updateEntityPageState } from "../../utils";
import { UpdateRowPreviewPayload } from "./types";
import { buildNextRowPreview } from "./utils";

/**
 * Reducer function to handle the "update row preview" action.
 * Updates the row preview in the state for the current entity.
 * @param state - Explore State.
 * @param payload - Payload.
 * @returns explore state.
 */
export function updateRowPreviewAction(
  state: ExploreState,
  payload: UpdateRowPreviewPayload
): ExploreState {
  const rowPreview = buildNextRowPreview(state, payload.updaterOrValue);
  return {
    ...state,
    entityPageState: updateEntityPageState(
      state.tabValue,
      state.entityPageState,
      { rowPreview }
    ),
  };
}
