import { RowData, Table } from "@tanstack/react-table";

export interface MenuItemsProps<T extends RowData> {
  tableInstance: Table<T>;
}
