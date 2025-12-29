import { Table } from "@tanstack/react-table";

export interface EntityListTable<T = unknown> {
  table: Table<T>;
}
