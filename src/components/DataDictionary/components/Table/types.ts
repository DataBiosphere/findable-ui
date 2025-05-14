import { RowData, Table } from "@tanstack/react-table";

export interface TableProps<T extends RowData> {
  table: Table<T>;
}
