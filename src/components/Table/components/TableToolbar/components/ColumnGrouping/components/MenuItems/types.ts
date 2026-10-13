import { RowData, Table } from "@tanstack/react-table";
import { UseMenu } from "../../../../../../../common/Menu/hooks/useMenu";

/**
 * Props for the column grouping MenuItems component.
 */
export interface MenuItemsProps<T extends RowData> {
  closeMenu: UseMenu<HTMLButtonElement>["onClose"];
  tableInstance: Table<T>;
}
