import { ListItemText } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { StyledDropdownMenu, StyledMenuItem } from "./columnVisibility.styles";
import { MenuItems } from "./components/MenuItems/menuItems";
import { LIST_ITEM_TEXT_PROPS, MENU_ITEM_PROPS, MENU_PROPS } from "./constants";
import { ColumnVisibilityProps } from "./types";

export const ColumnVisibility = <T extends RowData>({
  tableInstance,
}: ColumnVisibilityProps<T>): JSX.Element | null => {
  const {
    options: { enableHiding },
    resetColumnVisibility,
  } = tableInstance;
  if (!enableHiding) return null;
  return (
    <StyledDropdownMenu
      {...MENU_PROPS}
      button={(props) => (
        <DropdownButton {...props}>Edit Columns</DropdownButton>
      )}
    >
      {(): JSX.Element[] => [
        <MenuItems key="column-visibility" tableInstance={tableInstance} />,
        <StyledMenuItem
          {...MENU_ITEM_PROPS}
          key="reset-visibility-state"
          disabled={false}
          onClick={() => resetColumnVisibility()}
        >
          <ListItemText {...LIST_ITEM_TEXT_PROPS}>Reset</ListItemText>
        </StyledMenuItem>,
      ]}
    </StyledDropdownMenu>
  );
};
