import { DEFAULT_ENTITY_VIEW_STATE } from "../../constants";
import { ExploreViewState } from "../../types";
import { ClearPresetPayload } from "./types";

/**
 * Reducer action to clear the preset for an entity list.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function clearPresetAction(
  state: ExploreViewState,
  payload: ClearPresetPayload,
): ExploreViewState {
  const { entityId } = payload;
  const entityState = state[entityId] ?? DEFAULT_ENTITY_VIEW_STATE;
  return {
    ...state,
    [entityId]: {
      ...entityState,
      presetKey: null,
    },
  };
}
