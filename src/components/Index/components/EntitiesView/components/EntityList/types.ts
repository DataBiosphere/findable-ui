import { RowData, Table } from "@tanstack/react-table";

export interface EntityListProps<T extends RowData> {
  entityListType: string;
  loading: boolean;
  table: Table<T>;
}
