import { CloseRounded } from "@mui/icons-material";
import { RowData } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { updater } from "../../../../../components/TableFeatures/ColumnFilter/utils";
import { StyledChip } from "./columnFilterTag.styles";
import { CHIP_PROPS, SVG_ICON_PROPS } from "./constants";
import { ColumnFilterTagProps } from "./types";

export const ColumnFilterTag = <T extends RowData>({
  className,
  column,
  ...props /* MuiChipProps */
}: ColumnFilterTagProps<T>): JSX.Element => {
  const filterValue = column.getFilterValue() as unknown[];
  return (
    <Fragment>
      {filterValue.map((value) => (
        <StyledChip
          {...CHIP_PROPS}
          key={String(value)}
          className={className}
          deleteIcon={<CloseRounded {...SVG_ICON_PROPS} />}
          label={String(value)}
          onClick={() => column.setFilterValue(updater(value))}
          onDelete={() => column.setFilterValue(updater(value))}
          {...props}
        />
      ))}
    </Fragment>
  );
};
