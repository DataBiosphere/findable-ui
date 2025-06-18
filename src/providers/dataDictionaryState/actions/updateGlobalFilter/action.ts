import { buildNextDictionaries } from "../../dictionaries/state";
import { DataDictionaryState } from "../../types";
import { UpdateGlobalFilterPayload } from "./types";
import { buildNextGlobalFilter, buildNextMeta } from "./utils";

/**
 * Reducer function to handle the "update global filter" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateGlobalFilterAction(
  state: DataDictionaryState,
  payload: UpdateGlobalFilterPayload
): DataDictionaryState {
  const globalFilter = buildNextGlobalFilter(payload);
  const meta = buildNextMeta(state, payload, globalFilter);
  return {
    ...state,
    dictionaries: buildNextDictionaries(state, payload.dictionary, {
      globalFilter,
    }),
    meta,
  };
}
