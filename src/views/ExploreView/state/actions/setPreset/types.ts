import { EntityId } from "../../types";
import { ExploreViewActionKind } from "../types";

/**
 * Payload for the SetPreset action.
 */
export interface SetPresetPayload {
  entityId: EntityId;
  presetKey: string;
}

/**
 * Action to set the preset for an entity list.
 */
export interface SetPresetAction {
  payload: SetPresetPayload;
  type: ExploreViewActionKind.SetPreset;
}
