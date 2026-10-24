import { RowData, Table } from "@tanstack/react-table";

/**
 * Value of the TableHead context, for the controls rendered in a column head.
 */
export interface TableHeadContextValue {
  /** Tab index for the head's controls; -1 in the pinned copy of the head, which stays clickable but out of the tab order. */
  tabIndex?: number;
}

/**
 * Props for the TableHead component.
 */
export interface TableHeadProps<T extends RowData> {
  tableInstance: Table<T>;
}
