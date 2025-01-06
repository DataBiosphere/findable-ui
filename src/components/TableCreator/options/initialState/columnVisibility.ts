import { RowData, TableOptions, VisibilityState } from "@tanstack/react-table";
import { ACCESSOR_KEYS } from "../../common/constants";

/**
 * Returns initial column visibility state.
 * @param tableOptions - Table options.
 * @returns column visibility state.
 */
export function getInitialColumnVisibilityState<T extends RowData>(
  tableOptions?:
    | Partial<TableOptions<T>>
    | Partial<Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">>
): VisibilityState {
  const { initialState } = tableOptions || {};
  const enableRowPosition = Boolean(tableOptions?.enableRowPosition);
  const enableRowSelection = Boolean(tableOptions?.enableRowSelection);
  return {
    [ACCESSOR_KEYS.ROW_POSITION]: enableRowPosition,
    [ACCESSOR_KEYS.SELECT]: enableRowSelection,
    ...initialState?.columnVisibility,
  };
}
