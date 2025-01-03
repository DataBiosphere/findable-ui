import { Column, RowData, Table } from "@tanstack/react-table";
import { UseMenu } from "../../../../../../../common/Menu/hooks/useMenu";

export interface MenuItemsProps<T extends RowData> {
  closeMenu: UseMenu<HTMLButtonElement>["onClose"];
  groupingByColumnId: Map<string, [string, Column<T>]>;
  tableInstance: Table<T>;
}
