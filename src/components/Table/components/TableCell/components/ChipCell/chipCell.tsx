import { Chip, ChipProps } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import React from "react";

export const ChipCell = <
  T extends RowData,
  TValue extends ChipProps = ChipProps
>({
  getValue,
}: CellContext<T, TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  return <Chip {...props} />;
};
