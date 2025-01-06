import { ListItemText, MenuItem } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { handleToggleGrouping } from "../../../../../TableFeatures/ColumnGrouping/utils";
import { MENU_ITEM_PROPS } from "../../constants";
import { MenuItemsProps } from "./types";

export const MenuItems = <T extends RowData>({
  closeMenu,
  groupingByColumnId,
  tableInstance,
}: MenuItemsProps<T>): JSX.Element[] => {
  const columnByMenuItem = [...groupingByColumnId.values()];
  return columnByMenuItem.map(([menuItem, column]) => (
    <MenuItem
      {...MENU_ITEM_PROPS}
      key={column.id}
      disabled={!column.getCanGroup() || !column.getIsVisible()}
      onClick={() => {
        handleToggleGrouping(tableInstance, column);
        closeMenu();
      }}
      selected={column.getIsGrouped()}
    >
      <ListItemText disableTypography>{menuItem}</ListItemText>
    </MenuItem>
  ));
};
