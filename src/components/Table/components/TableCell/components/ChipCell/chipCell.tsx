import { Chip, ChipProps } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../../types";

/**
 * Chip cell, rendering a chip from the cell value's chip props.
 * @param props - Component props, the TanStack cell context plus a class name.
 * @param props.className - Class name applied to the chip.
 * @param props.getValue - Function returning the cell value, the chip props.
 * @returns The chip, or null when the cell value is falsy.
 */
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
