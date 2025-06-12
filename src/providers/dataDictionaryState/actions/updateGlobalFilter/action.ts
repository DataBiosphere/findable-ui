import { META_COMMAND } from "../../../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { buildNextDictionaries } from "../../dictionaries/state";
import { DataDictionaryState } from "../../types";
import { UpdateGlobalFilterPayload } from "./types";
import { buildNextGlobalFilter } from "./utils";

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
  return {
    ...state,
    dictionaries: buildNextDictionaries(state, payload.dictionary, {
      globalFilter: buildNextGlobalFilter(payload),
    }),
    meta: { command: META_COMMAND.STATE_TO_URL_PUSH },
  };
}
