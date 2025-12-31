import { buildNextTablesByGroupKey } from "../../state/tables/updater";
import { TablesState } from "../../state/types";
import { UrlToStatePayload } from "./types";
import { assertRegistry } from "../../state/registries/utils";
import { buildNextColumnFilters } from "./utils";

/**
 * Reducer function to handle the "URL >> state sync" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function urlToStateAction(
  state: TablesState,
  payload: UrlToStatePayload,
): TablesState {
  const tableKey = payload.tableKey;
  assertRegistry(state, tableKey);
  const columnFilters = buildNextColumnFilters(payload);
  const groupKey = state.registry[tableKey].groupKey;
  return {
    ...state,
    tables: buildNextTablesByGroupKey(state, groupKey, { columnFilters }),
  };
}
