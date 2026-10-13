import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the TableToolbar2 component.
 */
export interface TableToolbar2Props<T extends RowData> {
  table: Table<T>;
}
