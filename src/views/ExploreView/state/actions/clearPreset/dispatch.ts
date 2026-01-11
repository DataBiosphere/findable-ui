import { ExploreViewActionKind } from "../types";
import { ClearPresetAction, ClearPresetPayload } from "./types";

/**
 * Action creator for clearing the preset for an entity.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function clearPreset(payload: ClearPresetPayload): ClearPresetAction {
  return {
    payload,
    type: ExploreViewActionKind.ClearPreset,
  };
}
