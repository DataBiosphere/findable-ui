import { Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import { CheckedIcon } from "../../../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { handleResetVisibilityState } from "../../../../../TableFeatures/ColumnVisibility/utils";
import { LIST_ITEM_TEXT_PROPS } from "./constants";
import { StyledMenuItem } from "./menuItems.styles";
import { MenuItemsProps } from "./types";
import {
  getCanHideColumns,
  getVisibleColumnCount,
  isToggleVisibilityDisabled,
} from "./utils";

/**
 * Column visibility menu items, one checkbox item per hideable column with a string header, checked when the column is visible, then a "Reset" item.
 * A column's item is disabled when the column is grouped, or is the only one of these columns that is visible and ungrouped.
 * Clicking an item toggles the column's visibility; "Reset" resets column visibility to its initial state, keeping grouped columns visible.
 * @param props - Component props.
 * @param props.tableInstance - TanStack table instance.
 * @returns The column visibility menu items.
 */
export const MenuItems = <T extends RowData>({
  tableInstance,
}: MenuItemsProps<T>): JSX.Element => {
  const { getAllColumns } = tableInstance;
  const columns = getCanHideColumns(getAllColumns());
  const visibleCount = getVisibleColumnCount(columns);
  return (
    <Fragment>
      {columns.map((column) => {
        const isDisabled = isToggleVisibilityDisabled(column, visibleCount);
        return (
          <ListItemButton
            key={column.id}
            component="li"
            disabled={isDisabled}
            onClick={() => column.toggleVisibility()}
          >
            <Checkbox
              checked={column.getIsVisible()}
              checkedIcon={<CheckedIcon />}
              disabled={isDisabled}
              icon={<UncheckedIcon />}
            />
            <ListItemText disableTypography>
              {column.columnDef.header}
            </ListItemText>
          </ListItemButton>
        );
      })}
      <StyledMenuItem
        component="li"
        onClick={() => handleResetVisibilityState(tableInstance)}
      >
        <ListItemText {...LIST_ITEM_TEXT_PROPS}>Reset</ListItemText>
      </StyledMenuItem>
    </Fragment>
  );
};
