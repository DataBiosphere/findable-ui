import { RowData } from "@tanstack/react-table";
import React from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { StyledDropdownMenu } from "./columnVisibility.styles";
import { MenuItems } from "./components/MenuItems/menuItems";
import { MENU_PROPS } from "./constants";
import { ColumnVisibilityProps } from "./types";

export const ColumnVisibility = <T extends RowData>({
  tableInstance,
}: ColumnVisibilityProps<T>): JSX.Element | null => {
  const {
    options: { enableHiding },
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
      ]}
    </StyledDropdownMenu>
  );
};
