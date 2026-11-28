import { Chip, ChipProps } from "@mui/material";
import { JSX } from "react";
import type { BaseComponentProps, CellValueProps } from "../../../../../types";

/**
 * Chip cell, rendering a chip from the cell value's chip props.
 * @param props - Component props, the cell value getter plus a class name; a TanStack cell context satisfies them.
 * @param props.className - Class name applied to the chip.
 * @param props.getValue - Function returning the cell value, the chip props.
 * @returns The chip, or null when the cell value is falsy.
 */
export const ChipCell = <TValue extends ChipProps = ChipProps>({
  className,
  getValue,
}: BaseComponentProps & CellValueProps<TValue>): JSX.Element | null => {
  const props = getValue();
  if (!props) return null;
  return <Chip className={className} {...props} />;
};
