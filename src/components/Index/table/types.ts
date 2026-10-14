import { RowData, Table } from "@tanstack/react-table";

/**
 * Return type for the useTable hook.
 */
export interface UseTable<T extends RowData> {
  table: Table<T>;
}

/**
 * Props for the useTable hook.
 */
export interface UseTableProps {
  entityListType: string;
}
