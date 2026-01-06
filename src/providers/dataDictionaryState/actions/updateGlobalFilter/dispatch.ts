import { DataDictionaryActionKind } from "../types";
import { UpdateGlobalFilterAction, UpdateGlobalFilterPayload } from "./types";

/**
 * Action creator for updating global filter in the state.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function updateGlobalFilter(
  payload: UpdateGlobalFilterPayload,
): UpdateGlobalFilterAction {
  return {
    payload,
    type: DataDictionaryActionKind.UpdateGlobalFilter,
  };
}
