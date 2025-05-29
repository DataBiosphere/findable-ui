import { DataDictionaryState } from "../../types";
import { decodeFilterParam } from "../utils";
import { UpdateStateFromUrlPayload } from "./types";
import { areEqualStateAndUrl } from "./utils";

/**
 * Reducer function to handle the "update state from url" action.
 * @param state - Data Dictionary State.
 * @param payload - Payload.
 * @returns data dictionary state.
 */
export function updateStateFromUrlAction(
  state: DataDictionaryState,
  payload: UpdateStateFromUrlPayload
): DataDictionaryState {
  if (areEqualStateAndUrl(state, payload)) return state;
  console.log("COLUMMN FILTERS NOT EQUAL - UPDATE STATE");
  const nextColumnFilters = decodeFilterParam(payload.filter);
  return {
    ...state,
    columnFilters: nextColumnFilters,
    meta: null,
  };
}
