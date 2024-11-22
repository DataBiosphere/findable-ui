import { Typography } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";
import { BaseComponentProps } from "../../../../../types";
import { TYPOGRAPHY_PROPS } from "./constants";
import { getRowPosition } from "./utils";

export const RowPositionCell = <TData extends RowData, TValue>({
  className,
  ...cellContext
}: BaseComponentProps & CellContext<TData, TValue>): JSX.Element => {
  return (
    <Typography {...TYPOGRAPHY_PROPS} className={className} component="div">
      {getRowPosition(cellContext)}
    </Typography>
  );
};
