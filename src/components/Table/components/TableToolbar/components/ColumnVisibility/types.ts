import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the ColumnVisibility component.
 */
export interface ColumnVisibilityProps<T extends RowData> {
  tableInstance: Table<T>;
}
