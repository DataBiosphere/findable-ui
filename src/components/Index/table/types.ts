import { RowData, Table } from "@tanstack/react-table";

export interface UseTable<T extends RowData> {
  table: Table<T>;
}
