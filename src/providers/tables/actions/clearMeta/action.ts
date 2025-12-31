import { TablesState } from "../../state/types";
import { ClearMetaPayload } from "./types";

/**
 * Reducer function to handle the "clear meta" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function clearMetaAction(
  state: TablesState,
  payload: ClearMetaPayload,
): TablesState {
  return {
    ...state,
    meta: payload,
  };
}
