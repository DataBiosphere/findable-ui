import { buildNextTables } from "../../state/tables/updater";
import { TablesState } from "../../state/types";
import { UrlToStatePayload } from "./types";
import { assertRegistry } from "../../state/registries/utils";

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
  return {
    ...state,
    tables: buildNextTables(state, tableKey, payload.tableState),
  };
}
