import { CloseRounded } from "@mui/icons-material";
import { RowData } from "@tanstack/react-table";
import { Fragment, JSX } from "react";
import { updater } from "../../../../../components/TableFeatures/ColumnFilter/utils";
import { StyledChip } from "./columnFilterTag.styles";
import { CHIP_PROPS, SVG_ICON_PROPS } from "./constants";
import { ColumnFilterTagProps } from "./types";

/**
 * Column filter tags, one chip per value in the column's filter value; clicking or deleting a chip removes its value from the filter.
 * The given Mui Chip props override the defaults, including the click and delete handlers.
 * @param props - Component props.
 * @param props.className - Class name applied to each chip.
 * @param props.column - TanStack column, which must have a filter value.
 * @returns The column filter tags.
 */
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
