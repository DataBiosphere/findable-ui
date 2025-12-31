import { InitialArgs } from "../../initializer/types";
import { TablesState } from "../types";
import { DEFAULT_TABLE_STATE } from "./constants";

/**
 * Initializes the TanStack table state for each table entry.
 * @param initialArgs - Initial arguments.
 * @returns The initialized tables.
 */
export function initTables(initialArgs: InitialArgs): TablesState["tables"] {
  const tables: TablesState["tables"] = {};

  for (const [tableKey, { tableOptions }] of Object.entries(initialArgs)) {
    const { initialState = {} } = tableOptions;

    tables[tableKey] = {
      ...DEFAULT_TABLE_STATE,
      ...initialState,
      pagination: {
        ...DEFAULT_TABLE_STATE.pagination,
        ...initialState.pagination,
      },
    };
  }

  return tables;
}
