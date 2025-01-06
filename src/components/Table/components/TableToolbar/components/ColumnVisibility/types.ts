import { RowData, Table } from "@tanstack/react-table";

export interface ColumnVisibilityProps<T extends RowData> {
  tableInstance: Table<T>;
}
