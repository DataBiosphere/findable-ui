import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the TableView component.
 */
export interface EntityListProps<T extends RowData> {
  entityListType: string;
  loading: boolean;
  table: Table<T>;
}
