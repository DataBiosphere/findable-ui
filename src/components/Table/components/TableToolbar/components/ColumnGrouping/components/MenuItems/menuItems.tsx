import { ListItemText, MenuItem } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import {
  handleClearGroupingState,
  handleToggleGrouping,
} from "../../../../../TableFeatures/ColumnGrouping/utils";
import { LIST_ITEM_TEXT_PROPS, MENU_ITEM_PROPS } from "./constants";
import { StyledMenuItem } from "./menuItems.styles";
import { MenuItemsProps } from "./types";
import {
  getCanGroupColumns,
  getVisibleColumnCount,
  isToggleGroupingDisabled,
} from "./utils";

export const MenuItems = <T extends RowData>({
  closeMenu,
  tableInstance,
}: MenuItemsProps<T>): JSX.Element => {
  const { getAllColumns } = tableInstance;
  const columns = getCanGroupColumns(getAllColumns());
  const visibleCount = getVisibleColumnCount(getAllColumns());
  return (
    <Fragment>
      {columns.map((column) => {
        return (
          <MenuItem
            {...MENU_ITEM_PROPS}
            key={column.id}
            disabled={isToggleGroupingDisabled(column, visibleCount)}
            onClick={() => {
              handleToggleGrouping(tableInstance, column);
              closeMenu();
            }}
            selected={column.getIsGrouped()}
          >
            <ListItemText disableTypography>
              {column.columnDef.header}
            </ListItemText>
          </MenuItem>
        );
      })}
      <StyledMenuItem
        {...MENU_ITEM_PROPS}
        onClick={() => {
          handleClearGroupingState(tableInstance);
          closeMenu();
        }}
      >
        <ListItemText {...LIST_ITEM_TEXT_PROPS}>Clear Grouping</ListItemText>
      </StyledMenuItem>
    </Fragment>
  );
};
