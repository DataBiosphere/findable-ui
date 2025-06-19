import { ButtonGroup } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../../../common/entities";
import { BUTTON_GROUP_PROPS } from "../../../../../common/ButtonGroup/constants";
import { ColumnFilter } from "../../../../../Table/components/TableFeatures/ColumnFilter/columnFilter";
import { ColumnFiltersProps } from "./types";

export const ColumnFilters = <T extends RowData = Attribute>({
  table,
}: ColumnFiltersProps<T>): JSX.Element | null => {
  const columns = table.getAllColumns();
  const columnFilters = columns.filter((column) => column.getCanFilter());
  const enableColumnFilters = table.options.enableColumnFilters;

  if (!enableColumnFilters) return null;

  return (
    <ButtonGroup {...BUTTON_GROUP_PROPS.SECONDARY_OUTLINED}>
      {columnFilters.map((column) => (
        <ColumnFilter key={column.id} column={column} />
      ))}
    </ButtonGroup>
  );
};
