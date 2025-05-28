import { resolveUpdater } from "../../../../components/Table/options/updater";
import { META_COMMAND } from "../../../dataDictionaryMeta/types";
import { DataDictionaryState } from "../../types";
import { UpdateColumnFiltersPayload } from "./types";

/**
 * Reducer function to handle the "update column filters" action.
 * @param state - Data dictionary state.
 * @param payload - Payload.
 * @returns data dictionary state.
 */
export function updateColumnFiltersAction(
  state: DataDictionaryState,
  payload: UpdateColumnFiltersPayload
): DataDictionaryState {
  const nextColumnFilters = resolveUpdater(
    payload.updaterOrValue,
    state.columnFilters
  );
  return {
    ...state,
    columnFilters: nextColumnFilters,
    meta: { command: META_COMMAND.STATE_TO_URL_PUSH },
  };
}
