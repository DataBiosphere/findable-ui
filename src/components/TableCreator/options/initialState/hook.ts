import {
  InitialTableState,
  RowData,
  TableOptions,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { getInitialColumnVisibilityState } from "./columnVisibility";

export function useInitialState<T extends RowData>(
  tableOptions?:
    | Partial<TableOptions<T>>
    | Partial<Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">>
): InitialTableState {
  const { initialState } = tableOptions || {};
  const columnVisibility = getInitialColumnVisibilityState(tableOptions);

  return useMemo(
    () => ({
      ...initialState,
      columnVisibility,
    }),
    [initialState, columnVisibility]
  );
}
