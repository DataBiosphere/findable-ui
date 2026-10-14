import { RowData, Table as TanStackTable } from "@tanstack/react-table";
import { JSX } from "react";
import { ListViewConfig } from "../../config/entities";
import { Table } from "../Table/table";

/**
 * Props for the TableCreator component.
 */
export interface TableCreatorProps<T> {
  listView?: ListViewConfig;
  loading: boolean;
  table: TanStackTable<T>;
}

/**
 * Table for the explore view.
 * @param props - Component props.
 * @param props.listView - List view config.
 * @param props.loading - Whether the table is loading.
 * @param props.table - Table instance.
 * @returns The table.
 */
export const TableCreator = <T extends RowData>({
  listView,
  loading,
  table,
}: TableCreatorProps<T>): JSX.Element => {
  return <Table listView={listView} loading={loading} table={table} />;
};
