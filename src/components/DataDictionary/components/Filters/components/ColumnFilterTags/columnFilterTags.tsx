import { Button } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Attribute } from "../../../../../../common/entities";
import { BUTTON_PROPS } from "../../../../../../styles/common/mui/button";
import { ColumnFilterTag } from "../../../../../Table/components/TableFeatures/ColumnFilter/components/ColumnFilterTag/columnFilterTag";
import { StyledGrid } from "./columnFilterTags.styles";
import { GRID_PROPS } from "./constants";
import { ColumnFilterTagsProps } from "./types";

export const ColumnFilterTags = <T extends RowData = Attribute>({
  className,
  table,
}: ColumnFilterTagsProps<T>): JSX.Element | null => {
  const { getAllColumns, resetColumnFilters } = table;
  const columns = getAllColumns().filter((column) => column.getIsFiltered());

  if (columns.length === 0) return null;

  return (
    <StyledGrid className={className} {...GRID_PROPS}>
      {columns.map((column) => (
        <ColumnFilterTag key={column.id} column={column} />
      ))}
      <Button
        onClick={() => resetColumnFilters(true)}
        variant={BUTTON_PROPS.VARIANT.TEXT}
      >
        Clear all
      </Button>
    </StyledGrid>
  );
};
