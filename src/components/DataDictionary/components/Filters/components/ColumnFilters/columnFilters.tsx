import { ButtonGroup, Theme, useMediaQuery } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX, ComponentProps } from "react";
import { Attribute } from "../../../../../../common/entities";
import { BUTTON_PROPS } from "../../../../../../styles/common/mui/button";
import { BUTTON_GROUP_PROPS } from "../../../../../common/ButtonGroup/constants";
import { ColumnFiltersAdapter } from "../../../../../Filter/components/adapters/tanstack/ColumnFiltersAdapter/columnFiltersAdapter";
import { Button } from "../../../../../Filter/components/surfaces/drawer/components/Button/button";
import { Drawer } from "../../../../../Filter/components/surfaces/drawer/Drawer/drawer";
import { ColumnFilter } from "../../../../../Table/components/TableFeatures/ColumnFilter/columnFilter";
import { ColumnFiltersProps } from "./types";

export const ColumnFilters = <T extends RowData = Attribute>({
  table,
}: ColumnFiltersProps<T>): JSX.Element | null => {
  const columns = table.getAllColumns();
  const columnFilters = columns.filter((column) => column.getCanFilter());
  const enableColumnFilters = table.options.enableColumnFilters;
  const isDrawer = useMediaQuery((theme: Theme) => theme.breakpoints.down(820));

  if (!enableColumnFilters) return null;

  if (isDrawer)
    return (
      <ColumnFiltersAdapter
        table={table}
        renderSurface={(props) => <Drawer Button={renderButton} {...props} />}
      />
    );

  return (
    <ButtonGroup {...BUTTON_GROUP_PROPS.SECONDARY_OUTLINED}>
      {columnFilters.map((column) => (
        <ColumnFilter key={column.id} column={column} />
      ))}
    </ButtonGroup>
  );
};

/**
 * Renders the drawer's open button with the specified size.
 * @param props - Button props.
 * @returns Button.
 */
function renderButton(props: ComponentProps<typeof Button>): JSX.Element {
  return <Button size={BUTTON_PROPS.SIZE.LARGE} {...props} />;
}
