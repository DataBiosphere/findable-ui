import { ExploreActionKind } from "../../../exploreState";
import {
  UpdateColumnVisibilityAction,
  UpdateColumnVisibilityPayload,
} from "./types";

/**
 * Action creator for updating column visibility in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateVisibility(
  payload: UpdateColumnVisibilityPayload
): UpdateColumnVisibilityAction {
  return {
    payload,
    type: ExploreActionKind.UpdateColumnVisibility,
  };
}
