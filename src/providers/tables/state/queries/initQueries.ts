import { InitialArgs } from "../../initializer/types";
import { TablesState } from "../types";

/**
 * Initializes the queries for each table entry.
 * @param initialArgs - Initial arguments.
 * @returns The initialized queries.
 */
export function initQueries(initialArgs: InitialArgs): TablesState["queries"] {
  const queries: TablesState["queries"] = {};

  for (const [tableKey] of Object.entries(initialArgs)) {
    queries[tableKey] = {};
  }

  return queries;
}
