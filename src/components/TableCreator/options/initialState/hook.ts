import {
  InitialTableState,
  RowData,
  TableOptions,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { getInitialColumnVisibilityState } from "./columnVisibility";

/**
 * Returns the table's initial state, with the row position and row selection
 * columns shown only when enabled, unless the initial column visibility says
 * otherwise.
 * @param tableOptions - Table options.
 * @returns Initial table state.
 */
export function useInitialState<T extends RowData>(
  tableOptions?:
    | Partial<TableOptions<T>>
    | Partial<Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">>,
): InitialTableState {
  const { initialState } = tableOptions || {};
  const columnVisibility = getInitialColumnVisibilityState(tableOptions);

  return useMemo(
    () => ({
      ...initialState,
      columnVisibility,
    }),
    [initialState, columnVisibility],
  );
}
