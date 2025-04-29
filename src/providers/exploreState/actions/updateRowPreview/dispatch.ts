import { ExploreActionKind } from "../../../exploreState";
import { UpdateRowPreviewAction, UpdateRowPreviewPayload } from "./types";

/**
 * Action creator for updating row preview in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateRowPreview(
  payload: UpdateRowPreviewPayload
): UpdateRowPreviewAction {
  return {
    payload,
    type: ExploreActionKind.UpdateRowPreview,
  };
}
