import { CellContext, RowData } from "@tanstack/react-table";
import { JSX, ReactNode } from "react";
import { CHIP_PROPS } from "../../../../../../styles/common/mui/chip";
import { BaseComponentProps } from "../../../../../types";
import { StyledChip } from "./codeCell.styles";

/**
 * Code cell, rendering the cell value as the label of a small chip.
 * @param props - Component props, the TanStack cell context plus a class name.
 * @param props.className - Class name applied to the chip.
 * @param props.getValue - Function returning the cell value, the chip label.
 * @returns The chip, or null when the cell value is falsy.
 */
export const CodeCell = <
  T extends RowData,
  TValue extends ReactNode = ReactNode,
>({
  className,
  getValue,
}: BaseComponentProps & CellContext<T, TValue>): JSX.Element | null => {
  const value = getValue();
  if (!value) return null;
  return (
    <StyledChip
      className={className}
      color={CHIP_PROPS.COLOR.DEFAULT}
      label={value}
      size={CHIP_PROPS.SIZE.SMALL}
    />
  );
};
