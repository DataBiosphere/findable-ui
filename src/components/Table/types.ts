import { RowData, Table } from "@tanstack/react-table";
import { ListViewConfig } from "../../config/entities";

export interface TableProps<T extends RowData> {
  listView?: ListViewConfig;
  loading?: boolean;
  table: Table<T>;
}
