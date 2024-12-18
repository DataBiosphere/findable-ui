import { ListItemText, MenuItem } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenuButtonProps } from "../../../../../common/DropdownMenu/common/entities";
import { DropdownMenu } from "../../../../../common/DropdownMenu/dropdownMenu";
import { StyledMenuItem } from "./columnGrouping.styles";
import { LIST_ITEM_TEXT_PROPS, MENU_ITEM_PROPS, MENU_PROPS } from "./constants";
import { ColumnGroupingProps } from "./types";
import { getButtonLabel, getColumnGrouping } from "./utils";

export const ColumnGrouping = <T extends RowData>({
  tableInstance,
}: ColumnGroupingProps<T>): JSX.Element | null => {
  const {
    getState,
    options: { enableGrouping },
    resetGrouping,
  } = tableInstance;
  if (!enableGrouping) return null;
  const { grouping } = getState();
  const groupingByColumnId = getColumnGrouping(tableInstance);
  return (
    <DropdownMenu
      {...MENU_PROPS}
      Button={(props: DropdownMenuButtonProps) =>
        renderButton({
          ...props,
          children: getButtonLabel(groupingByColumnId, grouping),
        })
      }
    >
      {({ closeMenu }): JSX.Element[] => [
        ...[...groupingByColumnId.values()].map(([menuItem, column]) => (
          <MenuItem
            {...MENU_ITEM_PROPS}
            key={column.id}
            onClick={() => {
              column.toggleGrouping();
              closeMenu();
            }}
            selected={column.getIsGrouped()}
          >
            <ListItemText disableTypography>{menuItem}</ListItemText>
          </MenuItem>
        )),
        <StyledMenuItem
          {...MENU_ITEM_PROPS}
          key="reset-grouping-state"
          disabled={grouping.length === 0}
          onClick={() => {
            resetGrouping(true);
            closeMenu();
          }}
        >
          <ListItemText {...LIST_ITEM_TEXT_PROPS}>Clear Grouping</ListItemText>
        </StyledMenuItem>,
      ]}
    </DropdownMenu>
  );
};

/**
 * Return the dropdown button.
 * @param props - Button props e.g. "onClick".
 * @returns button element.
 */
function renderButton(props: DropdownMenuButtonProps): JSX.Element {
  return <DropdownButton {...props} />;
}
