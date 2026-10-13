import { Typography } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../../types";
import { TYPOGRAPHY_PROPS } from "./constants";

/**
 * Row position cell, rendering the row's position in the table.
 * @param props - Component props, the TanStack cell context plus a class name.
 * @param props.className - Class name applied to the position text.
 * @returns The row position.
 */
export const RowPositionCell = <TData extends RowData, TValue>({
  className,
  ...cellContext
}: BaseComponentProps & CellContext<TData, TValue>): JSX.Element => {
  return (
    <Typography {...TYPOGRAPHY_PROPS} className={className} component="div">
      {cellContext.row.getRowPosition()}
    </Typography>
  );
};
