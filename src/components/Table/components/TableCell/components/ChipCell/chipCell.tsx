import { Chip, ChipProps } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../../types";

export const ChipCell = <
  T extends RowData,
  TValue extends ChipProps = ChipProps,
>({
  className,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  return <Chip className={className} {...props} />;
};
