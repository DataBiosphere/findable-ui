import { RowData, Table } from "@tanstack/react-table";

export interface TableToolbar2Props<T extends RowData> {
  table: Table<T>;
}
