import { TablesState } from "../types";
import { TableGroupKey } from "../registries/types";
import { PartialTableState, TableKey } from "../../state/tables/types";

/**
 * Builds the next table states.
 * @param state - State.
 * @param tableKey - Table key.
 * @param nextTableState - Next table state.
 * @returns Table states.
 */
export function buildNextTables(
  state: TablesState,
  tableKey: TableKey,
  nextTableState: PartialTableState,
): TablesState["tables"] {
  const { columnFilters, ...tableState } = nextTableState;

  // Build the next table states by group key, only updating the column filters.
  const nextTables = buildNextTablesByGroupKey(
    state,
    state.registry[tableKey].groupKey,
    { columnFilters },
  );

  // Update the table state for the table key.
  nextTables[tableKey] = { ...nextTables[tableKey], ...tableState };

  return nextTables;
}

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
  nextTableState: Pick<PartialTableState, "columnFilters">,
): TablesState["tables"] {
  const nextTables: TablesState["tables"] = { ...state.tables };

  if (nextTableState.columnFilters === undefined) return nextTables;

  for (const [tableKey, tableRegistry] of Object.entries(state.registry)) {
    if (tableRegistry.groupKey !== groupKey) continue;

    const prevTable = state.tables[tableKey];
    nextTables[tableKey] = { ...prevTable, ...nextTableState };
  }

  return nextTables;
}
