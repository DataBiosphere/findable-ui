import { TableState } from "@tanstack/react-table";
import { stateToUrlQuery } from "../../../../utils/stateToUrlQuery";
import { TablesState } from "../types";
import { TableGroupKey } from "../registries/types";
import { extractUrlState } from "./utils";

/**
 * Builds the next queries by group key.
 * @param state - State.
 * @param groupKey - Group key.
 * @param nextTableState - Next table state (`columnFilters` only).
 * @returns Queries.
 */
export function buildNextQueriesByGroupKey(
  state: TablesState,
  groupKey: TableGroupKey,
  nextTableState: Pick<TableState, "columnFilters">,
): TablesState["queries"] {
  const nextQueries: TablesState["queries"] = { ...state.queries };

  for (const [tableKey, tableRegistry] of Object.entries(state.registry)) {
    if (tableRegistry.groupKey !== groupKey) continue;

    // Update next queries state.
    nextQueries[tableKey] = stateToUrlQuery(extractUrlState(nextTableState));
  }

  return nextQueries;
}
