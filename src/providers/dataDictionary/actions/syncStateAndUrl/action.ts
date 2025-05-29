import { META_COMMAND } from "../../../dataDictionarySync/types";
import { DataDictionaryState } from "../../types";
import { decodeFilterParam } from "../utils";
import { SyncStateAndUrlPayload } from "./types";

/**
 * Reducer function to handle the "sync state and url" action.
 * @param state - Data Dictionary State.
 * @param payload - Payload.
 * @returns data dictionary state.
 */
export function syncStateAndUrlAction(
  state: DataDictionaryState,
  payload: SyncStateAndUrlPayload
): DataDictionaryState {
  // Filter params are undefined - update URL with state.
  if (!payload.filter) {
    // Column filters are empty - do nothing.
    if (state.columnFilters.length === 0) return state;

    // Column filters are not empty - update URL.
    return {
      ...state,
      meta: { command: META_COMMAND.STATE_TO_URL_REPLACE },
    };
  }

  // Filter params are defined - update state with URL.
  return {
    ...state,
    columnFilters: decodeFilterParam(payload.filter),
    meta: null,
  };
}
