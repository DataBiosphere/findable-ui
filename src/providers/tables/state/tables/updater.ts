import { TableState } from "@tanstack/react-table";
import { TablesState } from "../types";
import { TableGroupKey } from "../registries/types";

/**
 * Builds the next table states by group key.
 * @param state - State.
 * @param groupKey - Group key.
 * @param nextTableState - Next table state.
 * @returns Table states.
 */
export function buildNextTablesByGroupKey(
  state: TablesState,
  groupKey: TableGroupKey,
  nextTableState: Pick<TableState, "columnFilters">,
): TablesState["tables"] {
  const nextTables: TablesState["tables"] = { ...state.tables };

  for (const [tableKey, tableRegistry] of Object.entries(state.registry)) {
    if (tableRegistry.groupKey !== groupKey) continue;

    const prevTable = state.tables[tableKey];
    nextTables[tableKey] = { ...prevTable, ...nextTableState };
  }

  return nextTables;
}
