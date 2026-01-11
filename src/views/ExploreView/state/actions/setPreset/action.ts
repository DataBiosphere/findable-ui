import { DEFAULT_ENTITY_VIEW_STATE } from "../../constants";
import { ExploreViewState } from "../../types";
import { SetPresetPayload } from "./types";

/**
 * Reducer action to set the preset for an entity list.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns State.
 */
export function setPresetAction(
  state: ExploreViewState,
  payload: SetPresetPayload,
): ExploreViewState {
  const { entityId, presetKey } = payload;
  const entityState = state[entityId] ?? DEFAULT_ENTITY_VIEW_STATE;
  return {
    ...state,
    [entityId]: { ...entityState, presetKey },
  };
}
