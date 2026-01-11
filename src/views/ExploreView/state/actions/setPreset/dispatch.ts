import { ExploreViewActionKind } from "../types";
import { SetPresetAction, SetPresetPayload } from "./types";

/**
 * Action creator for setting the preset for an entity.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function setPreset(payload: SetPresetPayload): SetPresetAction {
  return {
    payload,
    type: ExploreViewActionKind.SetPreset,
  };
}
