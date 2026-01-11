import { EntityId } from "../../types";
import { ExploreViewActionKind } from "../types";

/**
 * Payload for the ClearPreset action.
 */
export interface ClearPresetPayload {
  entityId: EntityId;
}

/**
 * Action to clear the preset for an entity list.
 */
export interface ClearPresetAction {
  payload: ClearPresetPayload;
  type: ExploreViewActionKind.ClearPreset;
}
