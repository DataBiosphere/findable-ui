import { Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { CheckedIcon } from "../../../../../../../common/CustomIcon/components/CheckedIcon/checkedIcon";
import { UncheckedIcon } from "../../../../../../../common/CustomIcon/components/UncheckedIcon/uncheckedIcon";
import { MenuItemsProps } from "./types";
import {
  getCanHideColumns,
  getVisibleColumnCount,
  isToggleVisibilityDisabled,
} from "./utils";

export const MenuItems = <T extends RowData>({
  tableInstance,
}: MenuItemsProps<T>): JSX.Element[] => {
  const { getAllColumns } = tableInstance;
  const columns = getCanHideColumns(getAllColumns());
  const visibleCount = getVisibleColumnCount(columns);
  return columns.map((column) => {
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
          {column.columnDef.meta?.header}
        </ListItemText>
      </ListItemButton>
    );
  });
};
