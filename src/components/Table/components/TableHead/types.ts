import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the TableHead component.
 */
export interface TableHeadProps<T extends RowData> {
  /** Tab index of the sort buttons; -1 keeps a pinned copy of the head out of the tab order. */
  sortTabIndex?: number;
  tableInstance: Table<T>;
}
