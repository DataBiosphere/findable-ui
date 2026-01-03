import { buildNextTablesByTableKey } from "../../state/tables/updater";
import { UpdatePaginationPayload } from "./types";
import { buildNextPagination } from "./utils";
import { TablesState } from "../../state/types";
import { assertRegistry } from "../../state/registries/utils";

/**
 * Reducer function to handle the "update pagination" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function updatePaginationAction(
  state: TablesState,
  payload: UpdatePaginationPayload,
): TablesState {
  const tableKey = payload.tableKey;
  assertRegistry(state, tableKey);
  const pagination = buildNextPagination(state, payload);
  const revision = payload.revision;
  return {
    ...state,
    revision,
    tables: buildNextTablesByTableKey(state, tableKey, { pagination }),
  };
}
