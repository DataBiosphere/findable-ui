import { ListItemText } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenu } from "../../../../../common/DropdownMenu/dropdownMenu";
import { handleClearGroupingState } from "../../../TableFeatures/ColumnGrouping/utils";
import { StyledMenuItem } from "./columnGrouping.styles";
import { MenuItems } from "./components/MenuItems/menuItems";
import { LIST_ITEM_TEXT_PROPS, MENU_ITEM_PROPS, MENU_PROPS } from "./constants";
import { ColumnGroupingProps } from "./types";
import { getButtonLabel, getColumnGrouping } from "./utils";

export const ColumnGrouping = <T extends RowData>({
  tableInstance,
}: ColumnGroupingProps<T>): JSX.Element | null => {
  const {
    getState,
    options: { enableGrouping },
  } = tableInstance;
  if (!enableGrouping) return null;
  const { grouping } = getState();
  const groupingByColumnId = getColumnGrouping(tableInstance);
  return (
    <DropdownMenu
      {...MENU_PROPS}
      button={(props) => (
        <DropdownButton {...props}>
          {getButtonLabel(groupingByColumnId, grouping)}
        </DropdownButton>
      )}
    >
      {({ closeMenu }): JSX.Element[] => [
        <MenuItems
          key="column-grouping"
          closeMenu={closeMenu}
          groupingByColumnId={groupingByColumnId}
          tableInstance={tableInstance}
        />,
        <StyledMenuItem
          {...MENU_ITEM_PROPS}
          key="reset-grouping-state"
          disabled={grouping.length === 0}
          onClick={() => {
            handleClearGroupingState(tableInstance);
            closeMenu();
          }}
        >
          <ListItemText {...LIST_ITEM_TEXT_PROPS}>Clear Grouping</ListItemText>
        </StyledMenuItem>,
      ]}
    </DropdownMenu>
  );
};
