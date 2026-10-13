import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the TableHead component.
 */
export interface TableHeadProps<T extends RowData> {
  tableInstance: Table<T>;
}
