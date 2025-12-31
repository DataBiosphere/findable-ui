import { META_COMMAND } from "../../../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { buildNextTablesByGroupKey } from "../../state/tables/updater";
import { UpdateColumnFiltersPayload } from "./types";
import { buildNextColumnFilters } from "./utils";
import { TablesState } from "../../state/types";
import { buildNextQueriesByGroupKey } from "../../state/queries/updater";
import { assertRegistry } from "../../state/registries/utils";

/**
 * Reducer function to handle the "update column filters" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updateColumnFiltersAction(
  state: TablesState,
  payload: UpdateColumnFiltersPayload,
): TablesState {
  const tableKey = payload.tableKey;
  assertRegistry(tableKey);
  const columnFilters = buildNextColumnFilters(state, payload);
  const groupKey = state.registry[tableKey].groupKey;
  return {
    ...state,
    meta: { command: META_COMMAND.STATE_TO_URL_PUSH },
    queries: buildNextQueriesByGroupKey(state, groupKey, { columnFilters }),
    tables: buildNextTablesByGroupKey(state, groupKey, { columnFilters }),
  };
}
