import { RowData, Table } from "@tanstack/react-table";

export interface ColumnGroupingProps<T extends RowData> {
  tableInstance: Table<T>;
}
