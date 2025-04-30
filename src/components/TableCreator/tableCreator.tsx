import { RowData, Table as TanStackTable } from "@tanstack/react-table";
import React from "react";
import { ListViewConfig } from "../../config/entities";
import { Table } from "../Table/table";

export interface TableCreatorProps<T> {
  listView?: ListViewConfig;
  loading: boolean;
  table: TanStackTable<T>;
}

export const TableCreator = <T extends RowData>({
  listView,
  loading,
  table,
}: TableCreatorProps<T>): JSX.Element => {
  return <Table listView={listView} loading={loading} table={table} />;
};
