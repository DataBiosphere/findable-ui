import { TablesActionKind } from "../types";
import { UpdateColumnFiltersAction, UpdateColumnFiltersPayload } from "./types";

/**
 * Action creator for updating column filters in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateColumnFilters(
  payload: UpdateColumnFiltersPayload,
): UpdateColumnFiltersAction {
  return {
    payload,
    type: TablesActionKind.UpdateColumnFilters,
  };
}
