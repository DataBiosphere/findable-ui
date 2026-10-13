import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the ColumnGrouping component.
 */
export interface ColumnGroupingProps<T extends RowData> {
  tableInstance: Table<T>;
}
