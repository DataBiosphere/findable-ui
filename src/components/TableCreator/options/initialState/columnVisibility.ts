import { RowData, TableOptions, VisibilityState } from "@tanstack/react-table";
import { COLUMN_IDENTIFIER } from "../../../Table/common/columnIdentifier";

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
    [COLUMN_IDENTIFIER.ROW_POSITION]: enableRowPosition,
    [COLUMN_IDENTIFIER.ROW_SELECTION]: enableRowSelection,
    ...initialState?.columnVisibility,
  };
}
