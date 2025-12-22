import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { DropdownButton } from "../../../../../common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenu } from "../../../../../common/DropdownMenu/dropdownMenu";
import { MenuItems } from "./components/MenuItems/menuItems";
import { MENU_PROPS } from "./constants";
import { ColumnGroupingProps } from "./types";
import { getButtonLabel } from "./utils";

export const ColumnGrouping = <T extends RowData>({
  tableInstance,
}: ColumnGroupingProps<T>): JSX.Element | null => {
  const {
    getAllColumns,
    options: { enableGrouping },
  } = tableInstance;
  if (!enableGrouping) return null;
  return (
    <DropdownMenu
      {...MENU_PROPS}
      button={(props) => (
        <DropdownButton {...props}>
          {getButtonLabel(getAllColumns())}
        </DropdownButton>
      )}
    >
      {({ closeMenu }): JSX.Element[] => [
        <MenuItems
          key="column-grouping"
          closeMenu={closeMenu}
          tableInstance={tableInstance}
        />,
      ]}
    </DropdownMenu>
  );
};
