import { RowData, Table } from "@tanstack/react-table";

export interface TableHeadProps<T extends RowData> {
  tableInstance: Table<T>;
}
