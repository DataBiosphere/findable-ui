import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { StyledDropdownMenu } from "./columnVisibility.styles";
import { MenuItems } from "./components/MenuItems/menuItems";
import { MENU_PROPS } from "./constants";
import { ColumnVisibilityProps } from "./types";

/**
 * Column visibility dropdown, an "Edit Columns" button opening a menu of the columns that can be hidden.
 * @param props - Component props.
 * @param props.tableInstance - TanStack table instance.
 * @returns The column visibility dropdown, or null when the table's hiding is not enabled.
 */
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
