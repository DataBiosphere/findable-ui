import { RowData, Table } from "@tanstack/react-table";

/**
 * Props for the column visibility MenuItems component.
 */
export interface MenuItemsProps<T extends RowData> {
  tableInstance: Table<T>;
}
