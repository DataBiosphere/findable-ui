import { META_COMMAND } from "../../../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { buildNextDictionaries } from "../../dictionaries/state";
import { DataDictionaryState } from "../../types";
import { UpdateColumnFiltersPayload } from "./types";
import { buildNextColumnFilters } from "./utils";

/**
 * Reducer function to handle the "update column filters" action.
 * @param state - Data dictionary state.
 * @param payload - Payload.
 * @returns data dictionary state.
 */
export function updateColumnFiltersAction(
  state: DataDictionaryState,
  payload: UpdateColumnFiltersPayload,
): DataDictionaryState {
  return {
    ...state,
    dictionaries: buildNextDictionaries(state, payload.dictionary, {
      columnFilters: buildNextColumnFilters(state, payload),
    }),
    meta: { command: META_COMMAND.STATE_TO_URL_PUSH },
  };
}
