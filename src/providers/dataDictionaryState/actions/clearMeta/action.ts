import { DataDictionaryState } from "../../types";
import { ClearMetaPayload } from "./types";

/**
 * Reducer function to handle the "clear meta" action.
 * @param state - Data Dictionary State.
 * @param payload - Payload.
 * @returns data dictionary state.
 */
export function clearMetaAction(
  state: DataDictionaryState,
  payload: ClearMetaPayload,
): DataDictionaryState {
  return {
    ...state,
    meta: payload,
  };
}
