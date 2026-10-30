import type { Column, RowData } from "@tanstack/react-table";

/**
 * Props for the ColumnFilterList component.
 */
export interface ColumnFilterListProps<T extends RowData> {
  column: Column<T>;
  /** The column's selected filter values. */
  filterValue: unknown[];
  /** The column's faceted values with their counts, sorted. */
  sortedValues: [unknown, number][];
}
