import { TablesActionKind } from "../types";
import { UpdatePaginationAction, UpdatePaginationPayload } from "./types";

/**
 * Action creator for updating pagination in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updatePagination(
  payload: UpdatePaginationPayload,
): UpdatePaginationAction {
  return {
    payload,
    type: TablesActionKind.UpdatePagination,
  };
}
