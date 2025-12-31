import { useTables } from "../UseTables/hook";
import { TableKey } from "../../state/tables/types";
import { UseTableQuery } from "./types";

/**
 * Returns table query for the given table key.
 * @param tableKey - Table key.
 * @returns table query.
 */
export const useTableQuery = (tableKey: TableKey): UseTableQuery => {
  const { state } = useTables();
  const { queries } = state;
  return { query: queries[tableKey] };
};
