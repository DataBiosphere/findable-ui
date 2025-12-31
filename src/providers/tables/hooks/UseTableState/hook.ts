import { useTables } from "../UseTables/hook";
import { TableKey } from "../../state/tables/types";
import { UseTableState } from "./types";

/**
 * Returns table state for the given table key.
 * @param tableKey - Table key.
 * @returns table state.
 */
export const useTableState = (tableKey: TableKey): UseTableState => {
  const { state } = useTables();
  const { tables } = state;
  return { state: tables[tableKey] };
};
