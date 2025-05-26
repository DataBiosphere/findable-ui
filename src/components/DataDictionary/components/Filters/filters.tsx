import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../common/entities";
import { ColumnFilters } from "./components/ColumnFilters/columnFilters";
import { StyledGrid } from "./filters.styles";
import { FiltersProps } from "./types";

export const Filters = <T extends RowData = Attribute>({
  table,
}: FiltersProps<T>): JSX.Element => {
  return (
    <StyledGrid>
      <ColumnFilters table={table} />
    </StyledGrid>
  );
};
